const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "facedesk",
    aliases: [],
    description: "Slam your face onto a desk",
    usage: "facedesk",
    async execute(message) {
        const gif = await require("../../kawaii-api").getGIF("facedesk");

        if(gif.includes("facedesk5.gif")) return this.execute(message);

        message.channel.send({
            embeds: [
                new EmbedBuilder()
                .setColor(message.member.displayHexColor)
                .setDescription(`${message.author} slams their face onto a desk`)
                .setImage(gif)
                .setFooter({ text: "GIF provided by: kawaii.red" })
            ]
        });
    }
}