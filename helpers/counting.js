const serverModel = require("../models/serverSchema");

module.exports = async (message) => {
    const lastMsg = (await message.channel.messages.fetch({ limit: 1, before: message.id })).first();
    let lastCount = lastMsg.content;

    const lastArgs = lastCount.split(/ +/);

    if(lastArgs.length == 1 && isNaN(lastCount) && message.content == 1) return;
    if(lastArgs.length == 1 && isNaN(lastCount) && message.content > 1) {
        message.delete();
        message.author.createDM().send(`You start with 1 not ${message.content}!!!`);
        return;
    }

    if(lastArgs.length > 1 && isNaN(lastArgs.find(a => !isNaN(a)))) return;
    if(lastArgs.length > 1 && !isNaN(lastArgs.find(a => !isNaN(a)))) lastCount = lastArgs.find(a => !isNaN(a));

    lastCount++;

    let num = message.content;

    const args = message.content.split(/ +/);

    if(args.length > 1) num = await args.find(s => s == lastCount)

    if(isNaN(num)) return message.delete();
    if(num != lastCount || message.author.id == lastMsg.author.id) return require("../helpers/wrongCountPunish")(message, lastCount, num, message.author.id == lastMsg.author.id);

    await serverModel.findOneAndUpdate({
        serverId: message.guild.id
    }, {
        count: num
    });
}