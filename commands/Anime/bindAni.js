const profileModel = require("../../models/profileSchema");
const { ApplicationCommandOptionType } = require("discord.js");

const name = "albind";
const desc = "Binds your AniList profile. Useful so you don't have to type it every time you want to check it";

module.exports = {
    name: name,
    aliases: [],
    description: desc,
    usage: "albind <AniList username>",
    slash: {
        name: name,
        description: desc,
        options: [
            {
                name: "username",
                type: ApplicationCommandOptionType.String,
                description: "Your AniList username",
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
        const { anilist } = require("../../index");
        
        if(!query) return this.reply.reply(message, type, { content: "You need to enter your AniList username!" });

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
            const userSearch = await anilist.searchEntry.user(query, 1, 1);
            if(userSearch.users.length < 1) return this.reply.reply(message, type, { content: "Sorry, I couldn't find anything..." });
    
            const user = await anilist.user.profile(userSearch.users[0].id);

            if(profileData.al == user.name) return this.reply.reply(message, type, { content: "You are already binded to that profile!" });
    
            await profileModel.findOneAndUpdate({ userId: id }, { al: user.name });

            this.reply.reply(message, type, { content: `You're now successfully binded to your AniList profile **${user.name}**!` });
        } catch(err) { console.log(err) }
    },

    reply: require("../../helpers/reply")
}