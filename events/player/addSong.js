const { EmbedBuilder } = require("discord.js");

module.exports = (queue, song) => {
    queue.textChannel.send({
        embeds: [
            new EmbedBuilder()
            .setColor(song.member.displayHexColor)
            .setTitle("Song Added to Queue")
            .setDescription(`[${song.name}](${song.url}) - \`${song.formattedDuration}\``)
            .setThumbnail(song.thumbnail)
            .setFooter({ iconURL: song.member.displayAvatarURL({ dynamic: true }), text: `Requested by: ${song.member.displayName}` })
        ]
    });
}