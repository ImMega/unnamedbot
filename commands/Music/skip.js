const name = "skip";
const desc = "Skips a song in queue";

module.exports = {
    name: name,
    aliases: ["next"],
    descriptio: desc,
    usage: "skip",
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

        distube.skip(message).then(() => {
            if(!type) message.react("⏭️");
            if(type) this.reply.reply(message, type, { content: "⏭️ Skipped song" });
        })
        .catch(err => {
            if(err.errorCode == "NO_UP_NEXT") {
                this.reply.reply(message, type, { content: "There is no next song!" });
            } else {
                console.log(err);
            }
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