const { distube } = require("../../index");

module.exports = {
    name: "skip",
    aliases: ["next"],
    descriptio: "Skips a song in queue",
    usage: "skip",
    async execute(message){
        if(!message.member.voice.channel) return message.reply("Well, you must be in a voice channel to do that.")
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId != message.member.voice.channelId) return message.reply("You must be in the same voice channel as me!");

        const queue = distube.getQueue(message);

        if(!queue) return message.reply("There is nothing playing.");

        distube.skip(message).then(() => message.react("⏭️"))
        .catch(err => {
            if(err.errorCode == "NO_UP_NEXT") {
                message.reply("There is no next song!");
            } else {
                console.log(err);
            }
        });
    }
}