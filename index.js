require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const AniList = require("anilist-node");
const mongoose = require("mongoose");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require("@distube/yt-dlp");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });
const anilist = new AniList();
const distube = new DisTube(client, {
    emitAddSongWhenCreatingQueue: false,
    nsfw: true,
    customFilters: {
      "bassboost":"bass=g=10"
    },
    plugins: [
      new SpotifyPlugin(),
      new SoundCloudPlugin(),
      new YtDlpPlugin()
    ]
});

client.prefix = "$";
client.ownerId = "470277450551656459";

client.developing = false;

module.exports = { client, anilist, distube }

fs.readdirSync("./handlers/").forEach(handler => require(`./handlers/${handler}`)(client, distube));

client.login(process.env.TOKEN);
mongoose.connect(process.env.MONGO)
.then(() => console.log("Connected to database!"))
.catch(err => console.log(err));

require("./randomActivities")(client);