const { distube } = require("../../index");

module.exports = {
    name: "pause",
    aliases: [],
    descriptio: "Pauses a song",
    usage: "pause",
    async execute(message){
        if(!message.member.voice.channel) return message.reply("Well, you must be in a voice channel to do that.")
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId != message.member.voice.channelId) return message.reply("You must be in the same voice channel as me!");

        const queue = distube.getQueue(message);

        if(!queue) return message.reply("There is nothing playing.");
        if(queue.paused) return message.reply("Dw it's already paused");

        queue.pause();

        message.react("✅");
    }
}