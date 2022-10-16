const fs = require("fs");

const vids = fs.readdirSync("./assets/videos/").filter(file => file.endsWith(".mp4"));

module.exports = {
    name: "fireforce",
    aliases: ["inferno"],
    description: "Fire goes brrrr",
    usage: "fireforce",
    execute(message){
        const random = Math.floor(Math.random() * vids.length);

        message.channel.send({ files: [`./assets/videos/${vids[random]}`] });
    }
}