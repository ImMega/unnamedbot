const { EmbedBuilder } = require("discord.js");

const kill = [
    "OH they ded",
    "Aw hell nawh, I'm outta here"
]

module.exports = {
    name: "kill",
    aliases: [],
    description: "kill someone. (not fr tho that's illegal)",
    usage: "kill <someone>",
    async execute(message, args) {
        const mention = message.mentions.users.first();

        if(!mention) return;
        if(mention == message.author) return message.reply({ content: "Yeeeeaa we don't want that", allowedMentions: { repliedUser: false } });

        const gif = await require("../../kawaii-api").getGIF("kill");

        const random = Math.floor(Math.random() * kill.length);

        message.channel.send({
            embeds: [
                new EmbedBuilder()
                .setColor(message.guild.members.me.displayHexColor)
                .setTitle(mention == message.guild.members.me.user ? gif.includes("kill9.gif") ? "Agh-" : "#@*$&UDNI#J" : gif.includes("kill9.gif") ? "And whoop, it snapped" : kill[random])
                .setDescription(`${message.author} got ${mention == message.guild.members.me.user ? "me" : mention} umm yea kinda ded${mention == message.guild.members.me.user ? ". Is this heaven?" : ""}`)
                .setImage(gif)
                .setFooter({ text: "Gifs provided by: kawaii.red" })
            ]
        });
    }
}