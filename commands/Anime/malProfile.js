const { EmbedBuilder } = require("discord.js");
const jikan = require("@mateoaranda/jikanjs");
const profileModel = require("../../models/profileSchema");

module.exports = {
    name: "malprofile",
    aliases: ["malpf", "maluser"],
    description: "Searches for a MAL user",
    usage: "malprofile <username>",
    async execute(message, args) {
        if(!args[0]) {
            const profile = await profileModel.findOne({ userId: message.author.id });

            if(!profile || !profile.mal) return message.reply("You have to search for a user or bind your own profile!")

            await this.malGetAndSendEmbed(message, profile.mal);
        } else {
            const mention = message.mentions.users.first();

            if(mention) {
                const profile = await profileModel.findOne({ userId: mention.id });

                if(!profile || !profile.mal) return message.reply("That person doesn't have their MAL binded.");

                await this.malGetAndSendEmbed(message, profile.mal);
            } else {
                const query = args[0];

                await this.malGetAndSendEmbed(message, query);
            }
        }
    },
    async malGetAndSendEmbed(message, query) {
        try {
            const user = await jikan.loadUser(query, "full");

            if(user.status) throw user.status;

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
        } catch(err) {
            console.log(err);
            
            if(err.toString().includes("404")) return message.reply("Sorry, couldn't find anything...");
            if(err.toString().includes("Idle timeout reached")) return message.reply("Sorry, MAL kinda didn't respond on time. You can try again if you want");
        }
    }
}