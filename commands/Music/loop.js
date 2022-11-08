const { distube } = require("../../index");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "loop",
    aliases: [],
    description: "Changes the loop mode of the queue",
    usage: "loop [off/song/queue]",
    execute(message, args){
        if(!message.member.voice.channel) return message.reply("Well, you must be in a voice channel to do that.")
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId != message.member.voice.channelId) return message.reply("You must be in the same voice channel as me!");

        const queue = distube.getQueue(message);

        if(!queue) return message.reply("There is nothing playing.");

        let mode;
        switch(args[0]){
            case "off" || 0:
                mode = 0;
                break;
            case "song":
                mode = 1;
                break;
            case "queue":
                mode = 2;
                break;
        }

        mode = queue.setRepeatMode(mode);
        mode = mode ? mode == 2 ? "queue" : "song" : "off";

        message.react("✅");

        message.channel.send({
            embeds: [
                new EmbedBuilder()
                .setColor(message.member.displayHexColor)
                .setTitle("Loop Mode Changed")
                .setDescription(`Loop mode changed to \`${mode}\``)
                .setFooter({ iconURL: message.member.displayAvatarURL({ dynamic: true }), text: message.member.displayName })
            ]
        });
    }
}