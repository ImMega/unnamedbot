const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { parseNumber } = require("distube");

const name = "volume";
const desc = "Changes the volume";

module.exports = {
    name: name,
    aliases: ["v"],
    description: desc,
    usage: "volume <volume percentage>",
    slash: {
        name: name,
        description: desc,
        options: [
            {
                name: "percentage",
                type: ApplicationCommandOptionType.Integer,
                description: "The percentage you want to set the volume at",
                required: true,
                minValue: 0,
                maxValue: 100
            }
        ]
    },

    async interactionInit(interaction) {
        await interaction.deferReply();

        this.execute(interaction, interaction.options.getInteger("percentage"), 1);
    },

    async msgInit(message, args) {
        this.execute(message, args[0], 0);
    },

    execute(message, volume, type){
        const { distube } = require("../../index");

        if(!message.member.voice.channel) return this.reply.reply(message, type, { content: "Well, you must be in a voice channel to do that." });
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId != message.member.voice.channelId) return this.reply.reply(message, type, { content: "You must be in the same voice channel as me!" });

        const queue = distube.getQueue(message);

        if(!queue) return this.reply.reply(message, type, { content: "There is nothing playing." })

        if(isNaN(volume)) return this.reply.reply(message, type, { content: "I only accept numbers for volume." });
        if(volume < 0) return this.reply.reply(message, type, { content: "I'm pretty sure that's impossible to do." });
        if(volume > 100) return this.reply.reply(message, type, { content: "Oi, no can do. You really want to hurt yours or someone elses ears?" });

        queue.setVolume(parseNumber(volume));

        if(!type) message.react("✅");

        this.reply.send(message, type, {
            embeds: [
                new EmbedBuilder()
                .setColor(message.member.displayHexColor)
                .setTitle("Volume Changed")
                .setDescription(`Volume has been set to \`${volume}%\``)
                .setFooter({ iconURL: message.member.displayAvatarURL({ dynamic: true }), text: message.member.displayName })
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