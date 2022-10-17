const serverModel = require("../models/serverSchema");

module.exports = async (message) => {
    let lastMsg = (await message.channel.messages.fetch({ limit: 1, before: message.id })).first().content;

    const lastArgs = lastMsg.split(/ +/);

    if(lastArgs.length == 1 && isNaN(lastMsg) && message.content == 1) return;
    if(lastArgs.length == 1 && isNaN(lastMsg) && message.content > 1) {
        message.delete();
        message.author.createDM().send(`You start with 1 not ${message.content}!!!`);
        return;
    }

    if(lastArgs.length > 1 && isNaN(lastArgs.find(a => !isNaN(a)))) return;
    if(lastArgs.length > 1 && !isNaN(lastArgs.find(a => !isNaN(a)))) lastMsg = lastArgs.find(a => !isNaN(a));

    lastMsg++;

    let num = message.content;

    const args = message.content.split(/ +/);

    if(args.length > 1) num = await args.find(s => s == lastMsg)

    if(isNaN(num)) return message.delete();
    if(num != lastMsg) return require("../helpers/wrongCountPunish")(message, lastMsg, num);

    await serverModel.findOneAndUpdate({
        serverId: message.guild.id
    }, {
        count: num
    });
}