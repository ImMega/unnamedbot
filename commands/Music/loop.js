const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

const name = "loop";
const desc = "Changes the loop mode of the queue";

module.exports = {
    name: name,
    aliases: [],
    description: desc,
    usage: "loop [off/song/queue]",
    slash: {
        name: name,
        description: desc,
        options: [
            {
                name: "mode",
                type: ApplicationCommandOptionType.String,
                description: "What you want to loop",
                choices: [
                    { name: "Loop Song", value: "song" },
                    { name: "Loop Queue", value: "queue" },
                    { name: "Loop Off", value: "off" }
                ]
            }
        ]
    },

    async interactionInit(interaction) {
        await interaction.deferReply();

        this.execute(interaction, interaction.options.getString("mode"), 1);
    },

    async msgInit(message, args) {
        this.execute(message, args[0], 0);
    },

    execute(message, choice, type){
        const { distube } = require("../../index");

        if(!message.member.voice.channel) return this.reply.reply(message, type, { content: "Well, you must be in a voice channel to do that." });
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId != message.member.voice.channelId) return this.reply.reply(message, type, { content: "You must be in the same voice channel as me!" });

        const queue = distube.getQueue(message);

        if(!queue) return this.reply.reply(message, type, { content: "There is nothing playing." });

        let mode;
        switch(choice){
            case "off" || 0:
                mode = 0;
                break;
            case "song":
                mode = 1;
                break;
            case "queue":
                mode = 2;
                break;
        }

        mode = queue.setRepeatMode(mode);
        mode = mode ? mode == 2 ? "queue" : "song" : "off";

        if(!type) message.react("✅");

        this.reply.send(message, type, {
            embeds: [
                new EmbedBuilder()
                .setColor(message.member.displayHexColor)
                .setTitle("Loop Mode Changed")
                .setDescription(`Loop mode changed to \`${mode}\``)
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