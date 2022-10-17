const serverModel = require("../../models/serverSchema");

module.exports = async (client, guild) => {
    try {
        await serverModel.findOneAndDelete({ serverId: guild.id });
    } catch(err) {
        console.log(err);
    }
}