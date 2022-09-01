const { MessageEmbed } = require("discord.js");

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

        message.channel.send({
            embeds: [
                new MessageEmbed()
                .setColor(message.guild.me.displayHexColor)
                .setTitle(mention == message.guild.me.user ? gif.includes("kill9.gif") ? "Agh-" : "#@*$&UDNI#J" : gif.includes("kill9.gif") ? "And whoop, it snapped" : "OH he ded")
                .setDescription(`${message.author} got ${mention == message.guild.me.user ? "me" : mention} umm yea kinda ded${mention == message.guild.me.user ? ". Is this heaven?" : ""}`)
                .setImage(gif)
                .setFooter({ text: "Gifs provided by: kawaii.red" })
            ]
        });
    }
}