const a = [
    {
        type: "WATCHING",
        name: ["anime", "Kimi No Na Wa."]
    },
    {
        type: "PLAYING",
        name: ["DDLC", "Scarlet Nexus"]
    },
    {
        type: "LISTENING",
        name: ["Ikiru Yosuga", "Bassline Yateru?"]
    }
]

module.exports = (client) => {
    setInterval(() => {
        const rngType = Math.floor(Math.random() * a.length);
        const rngName = Math.floor(Math.random() * a[rngType].name.length);

        client.user.setActivity({ type: a[rngType].type, name: a[rngType].name[rngName] });
    }, 7000);
}