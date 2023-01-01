const { ActionRowBuilder, ButtonBuilder } = require("discord.js");

const name = "queue";
const desc = "Shows the queue";

module.exports = {
    name: name,
    aliases: ["q"],
    description: desc,
    usage: "queue",
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

        const songsArray = queue.songs.map((song, i) =>{
            return `[${i + 1}] ${song.name} - ${song.formattedDuration}${i == 0 ? " --- [Now Playing]" : ""}`
        });

        const row = (page, songs) => {
            return new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("up").setStyle("Primary").setEmoji("⬆️").setDisabled(!(page>0)),
                new ButtonBuilder().setCustomId("down").setStyle("Primary").setEmoji("⬇️").setDisabled(!(((page+1)*8) < songs))
            );
        }

        const reply = await this.reply.send(message, type, {
            content: `\`\`\`ini\n${songsArray.slice(0, 8).join("\n")}\`\`\``,
            components: [row(0, songsArray.length)]
        });

        const filter = i => (i.customId == "up" || i.customId == "down") && i.user.id == message.member.user.id;

        const collector = await reply.createMessageComponentCollector({ filter, time: 15000 });

        let page = 0;

        collector.on("collect", async i => {
            if(i.customId == "down") {
                page++;
                await i.update({
                    content: `\`\`\`ini\n${songsArray.slice(8*page, 8*(page+1)).join("\n")}\`\`\``,
                    components: [row(page, songsArray.length)]
                });
            }
            else if(i.customId == "up") {
                page--;
                await i.update({
                    content: `\`\`\`ini\n${songsArray.slice(8*page, 8*(page+1)).join("\n")}\`\`\``,
                    components: [row(page, songsArray.length)]
                });
            }
        });

        collector.on("end", collected => {
            reply.edit({
                components: [row(false)]
            });
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