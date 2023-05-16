const fs = require("fs");

module.exports = (message, err) => {
    const date = new Date();

    const writeStream = fs.createWriteStream(`./logs/${message.guild.id}-${date.getUTCFullYear()}${date.getUTCMonth()}${date.getUTCDay()}-${date.getUTCHours()}${date.getUTCMinutes()}${date.getUTCSeconds()}.txt`);
    writeStream.write(err.toString());
    writeStream.end();

    console.log(`\x1b[31mAn error has occured. Check log \x1b[37m${message.guild.id}-${date.getUTCFullYear()}${date.getUTCMonth()}${date.getUTCDay()}-${date.getUTCHours()}${date.getUTCMinutes()}${date.getUTCSeconds()}.txt\x1b[31m for more details.\x1b[0m`);
}