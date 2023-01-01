const name = "resume";
const desc = "Resumes a song if paused";

module.exports = {
    name: name,
    aliases: [],
    descriptio: desc,
    usage: "resume",
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
        if(queue.playing) return this.reply.reply(message, type, { content: "It's already playing!" });

        queue.resume();

        if(!type) message.react("✅");
        if(type) this.reply.reply(message, type, { content: "✅ Song resumed" });
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