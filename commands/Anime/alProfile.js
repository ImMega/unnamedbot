const { EmbedBuilder } = require("discord.js");
const { anilist } = require("../../index");
const profileModel = require("../../models/profileSchema");

module.exports = {
    name: "alprofile",
    aliases: ["alpf", "aluser"],
    description: "Searches for an Anilist user",
    usage: "alprofile <username>",
    async execute(message, args) {
        if(!args[0]) {
            const profile = await profileModel.findOne({ userId: message.author.id });

            if(!profile || !profile.al) return message.reply("You have to search for a user or bind your own profile!")

            await this.alGetAndSendEmbed(message, profile.al);
        } else {
            const mention = message.mentions.users.first();

            if(mention) {
                const profile = await profileModel.findOne({ userId: mention.id });

                if(!profile || !profile.al) return message.reply("That person doesn't have their AniList binded.");

                await this.alGetAndSendEmbed(message, profile.mal);
            } else {
                const query = args[0];

                await this.alGetAndSendEmbed(message, query);
            }
        }
    },

    async alGetAndSendEmbed(message, query) {
        const userSearch = await anilist.searchEntry.user(query, 1, 1);
        if(userSearch.users.length < 1) return message.reply("Sorry, I couldn't find anything...");

        const user = await anilist.user.profile(userSearch.users[0].id);
        const userStats = await anilist.user.stats(userSearch.users[0].id);

        const embed = new EmbedBuilder()
        .setColor(message.guild.members.me.displayHexColor)
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