const { client } = require("../../index");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    aliases: ["?"],
    description: "Shows command list or information about a specific command",
    usage: "help [command]",
    execute(message, args) {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setTitle(`${client.user.username} Command List`)
            .setDescription(`To see some more info about a specific command do \`${client.prefix + this.usage}\``)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setFooter({ iconURL: client.user.avatarURL({ dynamic: true }), text: `${client.user.username} Command List` })

            client.categories.forEach(cat => embed.addField(cat.name, `\`${cat.cmds.join("` - `")}\``));

            message.channel.send({ embeds: [embed] })
        } else {
            const cmd = client.commands.get(args[0]) || client.commands.get(client.cmdaliases.get(args[0]));

            message.channel.send({
                embeds: [
                    new MessageEmbed()
                    .setColor(message.guild.me.displayHexColor)
                    .setTitle(client.prefix + cmd.name)
                    .setDescription(`${cmd.description}\n\n${cmd.aliases.length > 0 ? `**Aliases:** \`${cmd.aliases.join(", ")}\`\n\n` : ""}**Usage:** \`${cmd.usage}\``)
                    .setThumbnail(client.user.avatarURL({ dynamic: true }))
                ]
            });
        }
    }
}