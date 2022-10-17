module.exports = async (message, required, inputed) => {
    message.delete();
    const dm = await message.author.createDM(true);

    let last = required;
    last--;

    dm.send(`Learn how to count b-baka!!! After **${last}** comes **${required}**, not **${inputed}**!`);
}