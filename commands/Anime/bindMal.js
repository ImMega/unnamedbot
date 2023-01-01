const jikan = require("@mateoaranda/jikanjs");
const profileModel = require("../../models/profileSchema");
const { ApplicationCommandOptionType } = require("discord.js");

const name = "malbind";
const desc = "Binds your MAL profile. Useful so you don't have to type it every time you want to check it";

module.exports = {
    name: name,
    aliases: [],
    description: desc,
    usage: "malbind <MAL username>",
    slash: {
        name: name,
        description: desc,
        options: [
            {
                name: "username",
                type: ApplicationCommandOptionType.String,
                description: "Your MAL username",
                required: true
            }
        ]
    },

    async interactionInit(interaction) {
        await interaction.deferReply();

        const id = interaction.user.id;
        const query = interaction.options.getString("username");

        this.execute(interaction, id, query, 1)
    },

    async msgInit(message, args) {
        const id = message.author.id;
        const query = args.join(" ");

        this.execute(message, id, query, 0);
    },

    async execute(message, id, query, type) {
        if(!query) return this.reply.reply(message, type, { content: "You need to enter your MAL username!" });

        let profileData;
        try {
            profileData = await profileModel.findOne({ userId: id });
    
            if(!profileData) {
                const profile = await profileModel.create({
                    userId: id
                });
    
                profile.save();
            }

            profileData = await profileModel.findOne({ userId: id });
        } catch(err) {
            console.log(err);
        }

        try {
            const malUser = await jikan.loadUser(query);

            if(profileData.mal == malUser.data.username) return this.reply.reply(message, type, { content: "You are already binded to that profile!" });
    
            await profileModel.findOneAndUpdate({ userId: id }, { mal: malUser.data.username });
    
            this.reply.reply(message, type, { content: `You're now successfully binded to your MAL profile **${malUser.data.username}**!` });
        } catch(err) {
            console.log(err);
            
            if(err.toString().includes("404") || err.toString().includes("null")) return this.reply.reply(message, type, { content: "Sorry, couldn't find anything..." });
            if(err.toString().includes("Idle timeout reached")) return this.reply.reply(message, type, { content: "Sorry, MAL kinda didn't respond on time. You can try again if you want" });
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