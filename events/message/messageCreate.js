const serverModel = require("../../models/serverSchema");

const checkCount = async (message) => {
    let serverData = await serverModel.findOne({ serverId: message.guild.id });

    if(!serverData || !serverData.countChId) return;
    if(message.channel.id !== serverData.countChId) return;

    require("../../helpers/counting")(message);
}

module.exports = async (client, message) => {
    checkCount(message);

    if(!message.content.startsWith(client.prefix) || message.author.bot) return;

    const args = message.content.slice(client.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.get(client.cmdaliases.get(command));

    if(cmd) cmd.execute(message, args);


    let serverData;
    try {
        serverData = await serverModel.findOne({ serverId: message.guild.id });

        if(!serverData) {
            const server = await serverModel.create({
                serverId: message.guild.id
            });

            server.save();
        }
    } catch(err) {
        console.log(err);
    }
}