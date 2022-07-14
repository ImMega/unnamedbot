const { MessageEmbed } = require("discord.js");
const { anilist } = require("../../index");

module.exports = {
    name: "alprofile",
    aliases: ["alpf", "aluser"],
    description: "Searches for an Anilist user",
    usage: "alprofile <username>",
    async execute(message, args) {
        const userSearch = await anilist.searchEntry.user("ItsMega", 1, 1);
        const user = await anilist.user.profile(userSearch.users[0].id);
        const userStats = await anilist.user.stats(userSearch.users[0].id);

        console.log(user);
        console.log(user.favourites.anime);

        const embed = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setTitle(user.name)
        .setDescription("\u200b")
        .setURL(user.siteUrl)
        .setThumbnail(user.avatar.large)
        .addFields([
            { name: "Anime", value: `Count: **${userStats.anime.count}**\nMean Score: **${userStats.anime.meanScore}**\nDays Watched: **${((userStats.anime.minutesWatched / 60) / 60).toFixed(1)}**\nEpisodes Watched: **${userStats.anime.episodesWatched}**`, inline: true },
            { name: "Manga", value: `Count: **${userStats.manga.count}**\nMean Score: **${userStats.manga.meanScore}**\nChapters Read: **${userStats.manga.chaptersRead}**\nVolumes Read: **${userStats.manga.volumesRead}**`, inline: true },
            { name: "Favourites", value: `\u200b\n${user.favourites.anime.length > 0 ? `**Anime:** ${user.favourites.anime.map(a => { return `\`${a.title.romaji}\`` }).join(", ")}` : ""}${user.favourites.manga.length > 0 ? `\n\u200b\n**Manga:** ${user.favourites.manga.map(m => { return `\`${m.title.romaji}\`` }).join(", ")}` : ""}` }
        ])
        .setFooter({ text: "Powered by: anilist.co" })

        message.channel.send({ embeds: [embed] });
    }
}