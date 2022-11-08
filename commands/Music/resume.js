const { distube } = require("../../index");

module.exports = {
    name: "resume",
    aliases: [],
    descriptio: "Resumes a song if paused",
    usage: "resume",
    async execute(message){
        if(!message.member.voice.channel) return message.reply("Well, you must be in a voice channel to do that.")
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId != message.member.voice.channelId) return message.reply("You must be in the same voice channel as me!");

        const queue = distube.getQueue(message);

        if(!queue) return message.reply("There is nothing playing.");
        if(queue.playing) return message.reply("It's already playing!");

        queue.resume();

        message.react("✅");
    }
}