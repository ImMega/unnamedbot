const fs = require("fs");

module.exports = (client, distube) => {
    const loadDir = (dir) => {
        const files = fs.readdirSync(`./events/${dir}/`).filter(file => file.endsWith(".js"));

        for (const file of files) {
            const eventName = file.split(".")[0];
            const event = require(`../events/${dir}/${file}`);
            client.on(eventName, event.bind(null, client));
        }

        if(files.length != 0) console.log(`Event ${dir} files successfully loaded!`);
    }

    ["client", "message", "guild"].forEach(event => loadDir(event));

    const pFiles = fs.readdirSync("./events/player").filter(file => file.endsWith(".js"));

    for (const file of pFiles) {
        const eventName = file.split(".")[0];
        const event = require(`../events/player/${file}`);
        distube.on(eventName, event.bind(null));
    }

    if(pFiles.length != 0) console.log(`Event player files successfully loaded!`);
}