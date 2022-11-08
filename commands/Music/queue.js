const { distube } = require("../../index");
const { ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    name: "queue",
    aliases: ["q"],
    description: "Shows the queue",
    usage: "queue",
    async execute(message, args){
        if(!message.member.voice.channel) return message.reply("Well, you must be in a voice channel to do that.")
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId != message.member.voice.channelId) return message.reply("You must be in the same voice channel as me!");

        const queue = distube.getQueue(message);

        if(!queue) return message.reply("There is nothing playing.");

        const songsArray = queue.songs.map((song, i) =>{
            return `[${i + 1}] ${song.name} - ${song.formattedDuration}${i == 0 ? " --- [Now Playing]" : ""}`
        });

        const row = (page, songs) => {
            return new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("up").setStyle("Primary").setEmoji("⬆️").setDisabled(!(page>0)),
                new ButtonBuilder().setCustomId("down").setStyle("Primary").setEmoji("⬇️").setDisabled(!(((page+1)*8) < songs))
            );
        }

        const reply = await message.channel.send({
            content: `\`\`\`ini\n${songsArray.slice(0, 8).join("\n")}\`\`\``,
            components: [row(0, songsArray.length)]
        });

        const filter = i => (i.customId == "up" || i.customId == "down") && i.user.id == message.author.id;

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
    }
}