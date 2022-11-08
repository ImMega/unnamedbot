const { EmbedBuilder } = require("discord.js");

module.exports = (queue, list) => {
    queue.textChannel.send({
        embeds: [
            new EmbedBuilder()
            .setColor(list.member.displayHexColor)
            .setTitle("List Added to Queue")
            .setDescription(`Playlist [${list.name}](${list.url})${list.source == "spotify" ? "" : ` with **${list.songs.length}** songs`} added to queue`)
            .setThumbnail(list.thumbnail)
            .setFooter({ iconURL: list.member.displayAvatarURL({ dynamic: true }), text: `Requested by: ${list.member.displayName}` })
        ]
    });
}