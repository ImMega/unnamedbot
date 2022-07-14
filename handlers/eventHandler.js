const fs = require("fs");

module.exports = (client) => {
    const loadDir = (dir) => {
        const files = fs.readdirSync(`./events/${dir}/`).filter(file => file.endsWith(".js"));

        for (const file of files) {
            const eventName = file.split(".")[0];
            const event = require(`../events/${dir}/${file}`);
            client.on(eventName, event.bind(null, client));
        }

        if(files.length != 0) console.log(`Event ${dir} files successfully loaded!`);
    }

    ["client", "message"].forEach(event => loadDir(event));
}