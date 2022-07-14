const { Collection } = require("discord.js"); 
const fs = require("fs");

module.exports = (client) => {
    client.commands = new Collection();
    client.cmdaliases = new Collection();

    const filesLoad = (folderPathArray, folderName, isMain, loadedFolders) => {
        const folderPath = folderPathArray.join("");

        const files = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));

        for (const file of files) {
            if(!fs.existsSync(folderPath + file)) continue;

            const cmd = require("." + folderPath + file);

            client.commands.set(cmd.name, cmd);
            cmd.aliases.forEach(alias => {
                client.cmdaliases.set(alias, cmd.name);
            });

            client.categories.find(cat => cat.name == folderName).cmds.push(cmd.name);

            console.log(`${file} has been loaded successfully!`);
        }

        if(files.length == 0) client.categories.pop();

        if (!isMain || loadedFolders.includes(folderName)) folderPathArray.pop();

        loadedFolders.push(folderName);

        folderSearch(folderPathArray, loadedFolders);
    }

    const folderSearch = (folderPathArray, loadedFolders) => {
        const folderPath = folderPathArray.join("");

        const files = fs.readdirSync(folderPath);

        for (const file of files) {
            if(loadedFolders.includes(file)) return;

            if(!fs.existsSync(folderPath + file)) continue;

            const fileStats = fs.statSync(folderPath + file);

            if(!fileStats.isDirectory()) continue;

            folderPathArray.push(file + "/");
            client.categories.push({ name: file, cmds: [] });

            filesLoad(folderPathArray, file, false, loadedFolders);
        }
    }

    client.categories = [
        {
            name: "Commands",
            cmds: []
        }
    ];

    filesLoad(["./commands/"], "Commands", true, []);
}