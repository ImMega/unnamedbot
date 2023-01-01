module.exports = async (client, interaction) => {
    if(!interaction.isCommand()) return;

    client.commands.get(interaction.commandName).interactionInit(interaction);
}