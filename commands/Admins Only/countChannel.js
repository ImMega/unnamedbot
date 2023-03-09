const serverModel = require("../../models/serverSchema");

module.exports = {
    name: "countchannel",
    aliases: ["countch"],
    description: "Sets a counting channel so the bot can see if you know how to count",
    usage: "countchannel <channel>",
    async msgInit(message, args){
        if(!message.member.permissions.has("ADMINISTRATOR")) return;

        const channelId = args[0].replace("<#", "").replace(">", "");

        const channel = await message.guild.channels.cache.get(channelId);

        if(!channel) return message.reply("Channel with that ID does not exist in this server.");

        await serverModel.findOneAndUpdate({ serverId: message.guild.id }, { countChId: channelId });

        message.reply(`<#${channelId}> successfully set as counting channel!`);
    }
}