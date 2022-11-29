module.exports = async (message, required, inputed, same) => {
    message.delete();

    const dm = await message.author.createDM(true);

    let last = required;
    last--;

    const wrongCount = `Learn how to count b-baka!!! After **${last}** comes **${required}**, not **${inputed}**!`;
    const samePerson = `Oi! Wait for your turn to count!!!`;

    dm.send(same == true ? samePerson : wrongCount);
}