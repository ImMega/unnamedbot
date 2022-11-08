const { client } = require("../..")

module.exports = async (channel, error) => {
    console.log(error);

    const owner = await client.users.fetch("470277450551656459");

    owner.send(`\`\`\`${error}\`\`\``);
}