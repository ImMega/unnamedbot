const serverModel = require("../../models/serverSchema");

module.exports = {
    name: "countchannel",
    aliases: ["countch"],
    description: "Sets a counting channel so the bot can see if you know how to count",
    usage: "countchannel <channel>",
    async execute(message, args){
        if(!message.member.permissions.has("ADMINISTRATOR")) return;

        const channelId = args[0].replace("<#", "").replace(">", "");

        await serverModel.findOneAndUpdate({ serverId: message.guild.id }, { countChId: channelId });

        message.reply(`<#${channelId}> successfully set as counting channel!`);
    }
}