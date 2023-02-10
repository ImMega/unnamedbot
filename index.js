require("dotenv").config();

const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const fs = require("fs");
const AniList = require("anilist-node");
const mongoose = require("mongoose");

const client = new Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessageReactions]
});
const anilist = new AniList();

client.prefix = "$";
client.ownerId = "470277450551656459";

client.developing = false;

module.exports = { client, anilist }

fs.readdirSync("./handlers/").forEach(handler => require(`./handlers/${handler}`)(client));

client.login(process.env.TOKEN);
mongoose.connect(process.env.MONGO)
.then(() => console.log("Connected to database!"))
.catch(err => console.log(err));

require("./randomActivities")(client, ActivityType);

// client.on("messageReactionAdd", async (reaction, user) => {
//     console.log(reaction.emoji);
// })