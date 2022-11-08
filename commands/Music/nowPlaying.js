const { distube } = require("../../index");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "nowplaying",
    aliases: ["np", "current"],
    description: "Shows info about the current playing song",
    usage: "nowplaying",
    async execute(message, args){
        if(!message.member.voice.channel) return message.reply("Well, you must be in a voice channel to do that.")
        if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId != message.member.voice.channelId) return message.reply("You must be in the same voice channel as me!");

        const queue = distube.getQueue(message);

        if(!queue) return message.reply("There is nothing playing.");

        const song = queue.songs[0];

        const progressBar = await require("../../helpers/progressBar")(queue.currentTime, song.duration);

        message.channel.send({
            embeds: [
                new EmbedBuilder()
                .setColor(song.member.displayHexColor)
                .setTitle("Currently Playing")
                .setDescription(`[${song.name}](${song.url})\n\`${queue.formattedCurrentTime}\` [${progressBar.join("")}] \`${song.formattedDuration}\``)
                .setThumbnail(song.thumbnail)
                .setFooter({ iconURL: song.member.displayAvatarURL({ dynamic: true }), text: `Requested by: ${song.member.displayName}` })
            ]
        });
    }
}