const { EmbedBuilder } = require("discord.js");
const { parseNumber } = require("distube");
const { distube } = require("../../index");

module.exports = {
    name: "volume",
    aliases: ["v"],
    description: "Changes the volume",
    usage: "volume <volume percentage>",
    execute(message, args){
        if(!message.member.voice.channel) return message.reply("Well, you must be in a voice channel to do that.")
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId != message.member.voice.channelId) return message.reply("You must be in the same voice channel as me!");

        const queue = distube.getQueue(message);

        if(!queue) return message.reply("There is nothing playing.");

        if(isNaN(args[0])) return message.reply("I only accept numbers for volume.");
        if(args[0] < 0) return message.reply("I'm pretty sure that's impossible to do.");
        if(args[0] > 100) return message.reply("Oi, no can do. You really want to hurt yours or someone elses ears?");

        queue.setVolume(parseNumber(args[0]));

        message.react("✅");

        message.channel.send({
            embeds: [
                new EmbedBuilder()
                .setColor(message.member.displayHexColor)
                .setTitle("Volume Changed")
                .setDescription(`Volume has been set to \`${args[0]}%\``)
                .setFooter({ iconURL: message.member.displayAvatarURL({ dynamic: true }), text: message.member.displayName })
            ]
        });
    }
}