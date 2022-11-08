const { distube } = require("../../index");

module.exports = {
    name: "stop",
    aliases: [],
    descriptio: "Stops the queue",
    usage: "stop",
    async execute(message){
        if(!message.member.voice.channel) return message.reply("Well, you must be in a voice channel to do that.")
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId != message.member.voice.channelId) return message.reply("You must be in the same voice channel as me!");

        const queue = distube.getQueue(message);

        if(!queue) return distube.voices.leave(message);

        distube.stop(message).then(() => message.react("🛑"))
        .catch(err => console.log(err));
    }
}