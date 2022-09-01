require("dotenv").config();

const { Client, Intents } = require("discord.js");
const fs = require("fs");
const AniList = require("anilist-node");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const anilist = new AniList();

client.prefix = "$";

module.exports = { client, anilist }

fs.readdirSync("./handlers/").forEach(handler => require(`./handlers/${handler}`)(client));

client.login(process.env.TOKEN);
require("./randomActivities")(client);