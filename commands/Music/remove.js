const { distube } = require("../../index");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "remove",
    aliases: ["r"],
    description: "Removes a song from the queue",
    usage: "remove <song's number in queue>",
    execute(message, args){
        if(!message.member.voice.channel) return message.reply("Well, you must be in a voice channel to do that.")
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId != message.member.voice.channelId) return message.reply("You must be in the same voice channel as me!");

        const queue = distube.getQueue(message);

        if(!queue) return message.reply("There is nothing in the queue.");

        if(isNaN(args[0])) return message.reply("I need a number of the song in the queue to remove it!");
        if(args[0] < 1) return message.reply("Pretty sure something can't be above first in the order...");
        if(args[0] > queue.songs.length) return message.reply("There is less songs in the queue than that!");

        const song = queue.songs.at(args[0] - 1);

        if(args[0] > 1) queue.songs.splice(args[0] - 1, 1);

        if(args[0] == 1 && queue.songs.length != 1) queue.skip();
        if(args[0] == 1 && queue.songs.length == 1) queue.stop();

        message.channel.send({
            embeds: [
                new EmbedBuilder()
                .setColor(message.member.displayHexColor)
                .setTitle("Removed from Queue")
                .setDescription(`[${song.name}](${song.url}) - \`${song.formattedDuration}\``)
                .setThumbnail(song.thumbnail)
                .setFooter({ iconURL: message.member.displayAvatarURL({ dynamic: true }), text: `Removed by: ${message.member.displayName} (Added by: ${song.member.displayName})` })
            ]
        });
    }
}