const { ApplicationCommandOptionType } = require("discord.js");

const name = "play";
const desc = "Plays a song";

module.exports = { 
    name: name,
    aliases: ["p"],
    description: desc,
    usage: "play <title or URL>",
    slash: {
        name: name,
        description: desc,
        options: [
            {
                name: "title",
                type: ApplicationCommandOptionType.String,
                description: "A song title or a link to the song",
                required: true
            }
        ]
    },

    async interactionInit(interaction) {
        await interaction.deferReply();

        this.execute(interaction, interaction.options.getString("title"), 1);
    },

    async msgInit(message, args) {
        this.execute(message, args.join(" "), 0);
    },

    async execute(message, query, type){
        const { distube } = require("../../index");

        if(!message.member.voice.channel) return this.reply.reply(message, type, { content: "Well, you must be in a voice channel to do that." });
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId != message.member.voice.channelId) return this.reply.reply(message, type, { content: "You must be in the same voice channel as me!" });

        if(!query) return this.reply.reply(message, type, { content: "How about you actually give me some song to play?" });

        let msg;
        if(type) msg = await message.editReply(`Sent play request for \`${query}\``);

        try {
            await distube.play(message.member.voice.channel, query, {
                message: type ? msg : message,
                member: message.member,
                textChannel: message.channel
            });
    
            message.guild.members.me.voice.setDeaf(true, "To minimize bot resource usage (REQUIRED)");
        } catch(err) {
            if(err.errorCode == "SPOTIFY_PLUGIN_UNKNOWN_EMBED") {
                this.reply.reply(message, type, { content: "Couldn't load the playlist. Make sure it's set to public so I can access it!" });
            } else {
                console.log(err);
            }
        }
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