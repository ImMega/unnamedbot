const { distube } = require("../../index");

module.exports = {
    name: "previous",
    aliases: [],
    descriptio: "Returns to a previous song",
    usage: "previous",
    async execute(message){
        if(!message.member.voice.channel) return message.reply("Well, you must be in a voice channel to do that.")
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId != message.member.voice.channelId) return message.reply("You must be in the same voice channel as me!");

        const queue = distube.getQueue(message);

        if(!queue) return message.reply("There is nothing playing.");

        distube.previous(message).then(() => message.react("⏮️"))
        .catch(err => {
            if(err.errorCode == "NO_PREVIOUS") {
                message.reply("There is no previous song!");
            } else {
                console.log(err);
            }
        });
    }
}