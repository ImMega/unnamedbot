const { EmbedBuilder } = require("discord.js");

module.exports = (queue, song) => {
    if(queue.playMsg) queue.playMsg.delete();

    queue.textChannel.send({
        embeds: [
            new EmbedBuilder()
            .setColor(song.member.displayHexColor)
            .setTitle("Now Playing")
            .setDescription(`[${song.name}](${song.url}) - \`${song.formattedDuration}\``)
            .setThumbnail(song.thumbnail)
            .setFooter({ iconURL: song.member.displayAvatarURL({ dynamic: true }), text: `Requested by: ${song.member.displayName}` })
        ]
    }).then(msg => queue.playMsg = msg);
}