const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

const name = "remove";
const desc = "Removes a song from the queue";

module.exports = {
    name: name,
    aliases: ["r"],
    description: desc,
    usage: "remove <song's number in queue>",
    slash: {
        name: name,
        description: desc,
        options: [
            {
                name: "index",
                type: ApplicationCommandOptionType.Integer,
                description: "A song's number in queue",
                required: true
            }
        ]
    },

    async interactionInit(interaction) {
        await interaction.deferReply();

        this.execute(interaction, interaction.options.getInteger("index"), 1);
    },

    async msgInit(message, args) {
        this.execute(message, args[0], 0);
    },

    execute(message, index, type){
        const { distube } = require("../../index");

        if(!message.member.voice.channel) return this.reply.reply(message, type, { content: "Well, you must be in a voice channel to do that." });
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId != message.member.voice.channelId) return this.reply.reply(message, type, { content: "You must be in the same voice channel as me!" });

        const queue = distube.getQueue(message);

        if(!queue) return this.reply.reply(message, type, { content: "There is nothing in the queue." });

        if(isNaN(index)) return this.reply.reply(message, type, { content: "I need a number of the song in the queue to remove it!" });
        if(index < 1) return this.reply.reply(message, type, { content: "Pretty sure something can't be above first in the order..." });
        if(index > queue.songs.length) return this.reply.reply(message, type, { content: "There is less songs in the queue than that!" });

        const song = queue.songs.at(index - 1);

        if(index > 1) queue.songs.splice(index - 1, 1);

        if(index == 1 && queue.songs.length != 1) queue.skip();
        if(index == 1 && queue.songs.length == 1) queue.stop();

        this.reply.send(message, type, {
            embeds: [
                new EmbedBuilder()
                .setColor(message.member.displayHexColor)
                .setTitle("Removed from Queue")
                .setDescription(`[${song.name}](${song.url}) - \`${song.formattedDuration}\``)
                .setThumbnail(song.thumbnail)
                .setFooter({ iconURL: message.member.displayAvatarURL({ dynamic: true }), text: `Removed by: ${message.member.displayName} (Added by: ${song.member.displayName})` })
            ]
        });
    },

    reply: {
        async send(message, type, content) {
            if(!type) {
                return message.channel.send(content);
            } else {
                return message.editReply(content);
            }
        },
        async reply(message, type, content) {
            if(!type) {
                return message.reply(content);
            } else {
                return message.editReply(content);
            }
        }
    }
}