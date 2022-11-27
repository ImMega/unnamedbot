const { anilist } = require("../../index");
const profileModel = require("../../models/profileSchema");

module.exports = {
    name: "albind",
    aliases: [],
    description: "Binds your AniList profile. Useful so you don't have to type it every time you want to check it",
    usage: "albind <AniList username>",
    async execute(message, args) {
        if(!args[0]) return message.reply("You need to enter your AniList username!");

        let profileData;
        try {
            profileData = await profileModel.findOne({ userId: message.author.id });
    
            if(!profileData) {
                const profile = await profileModel.create({
                    userId: message.author.id
                });
    
                profile.save();
            }

            profileData = await profileModel.findOne({ userId: message.author.id });
        } catch(err) {
            console.log(err);
        }

        try {
            const userSearch = await anilist.searchEntry.user(args[0], 1, 1);
            if(userSearch.users.length < 1) return message.reply("Sorry, I couldn't find anything...");
    
            const user = await anilist.user.profile(userSearch.users[0].id);

            if(profileData.al == user.name) return message.reply("You are already binded to that profile!")
    
            await profileModel.findOneAndUpdate({ userId: message.author.id }, { al: user.name });

            message.reply(`You're now successfully binded to your AniList profile **${user.name}**!`);
        } catch(err) { console.log(err) }
    }
}