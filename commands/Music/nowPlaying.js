const { EmbedBuilder } = require("discord.js");

const name = "nowplaying";
const desc = "Shows info about the current playing song";

module.exports = {
    name: name,
    aliases: ["np", "current"],
    description: desc,
    usage: "nowplaying",
    slash: {
        name: name,
        description: desc
    },

    async interactionInit(interaction) {
        await interaction.deferReply();

        this.execute(interaction, 1);
    },

    async msgInit(message) {
        this.execute(message, 0);
    },

    async execute(message, type){
        const { distube } = require("../../index");
        
        if(!message.member.voice.channel) return this.reply.reply(message, type, { content: "Well, you must be in a voice channel to do that." });
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId != message.member.voice.channelId) return this.reply.reply(message, type, { content: "You must be in the same voice channel as me!" });

        const queue = distube.getQueue(message);

        if(!queue) return this.reply.reply(message, type, { content: "There is nothing playing." });

        const song = queue.songs[0];

        const progressBar = await require("../../helpers/progressBar")(queue.currentTime, song.duration);

        this.reply.send(message, type, {
            embeds: [
                new EmbedBuilder()
                .setColor(song.member.displayHexColor)
                .setTitle("Currently Playing")
                .setDescription(`[${song.name}](${song.url})\n\`${queue.formattedCurrentTime}\` [${progressBar.join("")}] \`${song.formattedDuration}\``)
                .setThumbnail(song.thumbnail)
                .setFooter({ iconURL: song.member.displayAvatarURL({ dynamic: true }), text: `Requested by: ${song.member.displayName}` })
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