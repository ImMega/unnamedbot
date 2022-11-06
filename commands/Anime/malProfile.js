const { EmbedBuilder } = require("discord.js");
const jikan = require("@mateoaranda/jikanjs");

module.exports = {
    name: "malprofile",
    aliases: ["malpf", "maluser"],
    description: "Searches for a MAL user",
    usage: "malprofile <username>",
    async execute(message, args) {
        if(!args[0]) return message.reply({ content: "You have to enter an user to search", allowedMentions: { repliedUser: false } });

        const query = args.join(" ");

        const user = await jikan.loadUser(query, "full");

        const embed = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor)
        .setTitle(user.data.username)
        .setDescription("\u200b")
        .setURL(user.data.url)
        .setThumbnail(user.data.images.jpg.image_url)
        .addFields([
            { name: "Anime", value: `Count: **${user.data.statistics.anime.completed}**\nMean Score: **${user.data.statistics.anime.mean_score}**\nDays Watched: **${user.data.statistics.anime.days_watched}**\nEpisodes Watched: **${user.data.statistics.anime.episodes_watched}**`, inline: true},
            { name: "Manga", value: `Count: **${user.data.statistics.manga.completed}**\nMean Score: **${user.data.statistics.manga.mean_score}**\nDays Read: **${user.data.statistics.manga.days_read}**\nChapters Read: **${user.data.statistics.manga.chapters_read}**\nVolumes Read: **${user.data.statistics.manga.volumes_read}**`, inline: true },
            { name: "Favourites", value: `\u200b\n${user.data.favorites.anime.length > 0 ? `**Anime:** ${user.data.favorites.anime.map(a => { return `\`${a.title}\`` }).join(", ")}` : ""}${user.data.favorites.manga.length > 0 ? `\n\u200b\n**Manga:** ${user.data.favorites.manga.map(m => { return `\`${m.title}\`` }).join(", ")}` : ""}` }
        ])
        .setFooter({ text: "Powered by: myanimelist.net" })

        message.channel.send({ embeds: [embed] });
    }
}