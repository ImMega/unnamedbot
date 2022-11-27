const jikan = require("@mateoaranda/jikanjs");
const profileModel = require("../../models/profileSchema");

module.exports = {
    name: "malbind",
    aliases: [],
    description: "Binds your MAL profile. Useful so you don't have to type it every time you want to check it",
    usage: "malbind <MAL username>",
    async execute(message, args) {
        if(!args[0]) return message.reply("You need to enter your MAL username!");

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
            const malUser = await jikan.loadUser(args.join(" "));

            if(profileData.mal == malUser.data.username) return message.reply("You are already binded to that profile!")
    
            await profileModel.findOneAndUpdate({ userId: message.author.id }, { mal: malUser.data.username });
    
            message.reply(`You're now successfully binded to your MAL profile **${malUser.data.username}**!`);
        } catch(err) {
            console.log(err);
            
            if(err.toString().includes("404")) return message.reply("Sorry, couldn't find anything...");
            if(err.toString().includes("Idle timeout reached")) return message.reply("Sorry, MAL kinda didn't respond on time. You can try again if you want");
        }
    }
}