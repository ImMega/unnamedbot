const { EmbedBuilder } = require("discord.js");

const kissElse = [
    "Lucky them",
    "Shh, don't interrupt them",
    "They did it!"
];

const kissMe = [
    "W-what???",
    "I-",
    "Huh?!?"
];

module.exports = {
    name: "kiss",
    aliases: [],
    description: "Kiss someone",
    usage: "kiss <someone>",
    async execute(message) {
        const mention = message.mentions.users.first();

        if(!mention) return;
        if(mention == message.author) return message.reply({ content: "How tf do you think you'd kiss yourself???", allowedMentions: { repliedUser: false } });

        const gif = await require("../../kawaii-api").getGIF("kiss");

        const random = Math.floor(Math.random() * (mention == message.author.user ? kissMe.length : kissElse.length));

        message.channel.send({
            embeds: [
                new EmbedBuilder()
                .setColor(message.guild.members.me.displayHexColor)
                .setTitle(mention == message.guild.members.me.user ? gif.includes("kiss11.gif") ? "Well let's- oh" : kissMe[random] : gif.includes("kiss11.gif") ? "Ouch" : kissElse[random])
                .setDescription(`${message.author} ${gif.includes("kiss11.gif") ? "tried to kiss" : "kissed"} ${mention == message.guild.members.me.user ? "me??" : `${mention}!`}`)
                .setImage(gif)
                .setFooter({ text: "Gif provided by: kawaii.red" })
            ]
        });
    }
}