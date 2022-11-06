require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const AniList = require("anilist-node");
const mongoose = require("mongoose");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent] });
const anilist = new AniList();

client.prefix = "$";
client.ownerId = "470277450551656459";

module.exports = { client, anilist }

fs.readdirSync("./handlers/").forEach(handler => require(`./handlers/${handler}`)(client));

client.login(process.env.TOKEN);
mongoose.connect(process.env.MONGO)
.then(() => console.log("Connected to database!"))
.catch(err => console.log(err));

require("./randomActivities")(client);

// client.on("messageCreate", message => {
//     message.guild.members.me
// })