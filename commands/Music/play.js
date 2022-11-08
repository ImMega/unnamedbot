const { distube } = require("../../index");

module.exports = { 
    name: "play",
    aliases: ["p"],
    description: "Plays a song",
    usage: "play <title or URL>",
    async execute(message, args){
        if(!message.member.voice.channel) return message.reply("Well, you must be in a voice channel to do that.")
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId != message.member.voice.channelId) return message.reply("You must be in the same voice channel as me!");

        if(!args[0]) return message.reply("How about you actually give me some song to play?");

        const query = args.join(" ");

        try {
            await distube.play(message.member.voice.channel, query, {
                message: message,
                member: message.member,
                textChannel: message.channel
            });
    
            message.guild.members.me.voice.setDeaf(true, "To minimize bot resource usage (REQUIRED)");
        } catch(err) {
            if(err.errorCode == "SPOTIFY_PLUGIN_UNKNOWN_EMBED") {
                message.reply("Couldn't load the playlist. Make sure it's set to public so I can access it!");
            } else {
                console.log(err);
            }
        }
    }
}