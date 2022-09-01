const { MessageEmbed } = require("discord.js");

const hugElse = [
    "Awww, give me one too",
    "Let me hug them too!",
    "That's so sweet",
    "Eyy, you forgot about me"
];

const hugMe = [
    "O-oh, um uh",
    "Me?",
    "I-I didn't expect this",
    "Thank you."
];

module.exports = {
    name: "hug",
    aliases: [],
    description: "Hug someone",
    usage: "hug <someone>",
    async execute(message) {
        const mention = message.mentions.users.first();

        if(!mention) return;

        if(message.author == mention) return message.reply({ content: "Yeaa don't be so lonely hug someone else not yourself", allowedMentions: { repliedUser: false } });

        const gif = await require("../../kawaii-api").getGIF("hug");

        const random = Math.floor(Math.random() * (mention == message.guild.me.user ? hugMe.length : hugElse.length));

        message.channel.send({ embeds: [
            new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setTitle(mention == message.guild.me.user ? gif.includes("hug17.gif") ? "Sorry, not now" : hugMe[random] : gif.includes("hug17.gif") ? "Umm, that was unexpected" : hugElse[random])
            .setDescription(`${message.author} gave ${mention == message.guild.me.user ? "me ": `${mention}`} a hug! ${gif.includes("hug17.gif") ? "Or... at least they tried to..." : ""}`)
            .setImage(gif)
            .setFooter({ text: "Gif provided by: kawaii.red" })
        ] })
    }
}