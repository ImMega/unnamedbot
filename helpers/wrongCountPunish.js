const serverModel = require("../models/serverSchema");

module.exports = async (message, required, inputed, same) => {
    try {
        message.delete();
    } catch(err) {
        console.log(err);
    }

    const dm = await message.author.createDM(true);

    let last = required;
    last--;

    const wrongCount = `Learn how to count b-baka!!! After **${last}** comes **${required}**, not **${inputed}**!`;
    const samePerson = `Oi! Wait for your turn to count!!!`;

    dm.send(same == true ? samePerson : wrongCount);

    let serverData;
    try {
        serverData = await serverModel.findOne({ serverId: message.guild.id });

        if(!serverData) {
            const server = await serverModel.create({
                serverId: message.guild.id
            });

            server.save();
        }

        serverData = await serverModel.findOne({ serverId: message.guild.id });
    } catch(err) {
        console.log(err);
    }

    if(!serverData.members.find(m => m.userId == message.author.id)) await serverModel.findOneAndUpdate({ serverId: message.guild.id }, {
        $push: {
            members: {
                "userId": message.author.id,
                "count": {
                    "correct": 0,
                    "wrong": 0
                }
            }
        }
    });

    if(same != true) await serverModel.findOneAndUpdate({
        "serverId": message.guild.id,
        "members.userId": message.author.id
    }, {
        $inc: {
            "members.$.count.wrong": 1
        }
    });
}