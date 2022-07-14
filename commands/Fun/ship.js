const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "test",
    aliases: [],
    description: "Uhhh... Ship someone?",
    usage: "ship [mention or something]",
    async execute(message, args) {
        if(!args[0]){console.log(message.member.nickname); console.log((await message.guild.members.fetch()).first())
            const members = await message.guild.members.fetch();
        
            const humans = members.filter((member) => { return member.user.bot != true }).map((member) => {
                if(member.nickname != null)
                {
                    return member.nickname;
                }
                else
                {
                    return member.user.username;
                }
            })

            const name = message.member.nickname == null ? message.author.username : message.member.nickname;

            const random = Math.floor(Math.random() * humans.length);

            const match = Math.floor(Math.random() * 100);

            const bar = await this.progressBar(match);
            const text = await this.text(match);

            message.channel.send({
                content: `💗 **MATCHMAKING** 💗\n🔻 _\`${name}\`_\n🔺 _\`${humans[random]}\`_`,
                embeds: [
                    new MessageEmbed()
                    .setColor(0xFF69B4)
                    .setDescription("<:name:997088413687758888> **" + name.slice(0, (name.length/2).toFixed(0)) + humans[random].slice(((humans[random].length/2).toString().includes(".5") ? (humans[random].length/2).toFixed(0) - 1 : (humans[random].length/2).toFixed(0)))
                                    + `**\n**${match}%** ` + `${bar.join("")}` + ` ${text}`)
                ]
            })
        }
        else
        {
            if(!message.mentions.members.first())
            {
                if(args[1])
                {
                    const match = Math.floor(Math.random() * 100);

                    const bar = await this.progressBar(match);
                    const text = await this.text(match);
        
                    message.channel.send({
                        content: `💗 **MATCHMAKING** 💗\n🔻 _\`${args[0]}\`_\n🔺 _\`${args[1]}\`_`,
                        embeds: [
                            new MessageEmbed()
                            .setColor(0xFF69B4)
                            .setDescription("<:name:997088413687758888> **" + args[0].slice(0, (args[0].length/2).toFixed(0)) + args[1].slice(((args[1].length/2).toString().includes(".5") ? (args[1].length/2).toFixed(0) - 1 : (args[1].length/2).toFixed(0)))
                                            + `**\n**${match}%** ` + `${bar.join("")}` + ` ${text}`)
                        ]
                    })
                }
                else
                {
                    const name = message.member.nickname == null ? message.author.username : message.member.nickname;

                    const match = Math.floor(Math.random() * 100);

                    const bar = await this.progressBar(match);
                    const text = await this.text(match);
        
                    message.channel.send({
                        content: `💗 **MATCHMAKING** 💗\n🔻 _\`${name}\`_\n🔺 _\`${args[0]}\`_`,
                        embeds: [
                            new MessageEmbed()
                            .setColor(0xFF69B4)
                            .setDescription("<:name:997088413687758888> **" + name.slice(0, (name.length/2).toFixed(0)) + args[0].slice(((args[0].length/2).toString().includes(".5") ? (args[0].length/2).toFixed(0) - 1 : (args[0].length/2).toFixed(0)))
                                            + `**\n**${match}%** ` + `${bar.join("")}` + ` ${text}`)
                        ]
                    })
                }
            }
            else
            {
                const name = message.member.nickname == null ? message.author.username : message.member.nickname;
                const mention = message.mentions.members.first().nickname == null ? message.mentions.users.first().username : message.mentions.members.first().nickname;
                
                const match = Math.floor(Math.random() * 100);

                const bar = await this.progressBar(match);
                const text = await this.text(match);
    
                message.channel.send({
                    content: `💗 **MATCHMAKING** 💗\n🔻 _\`${name}\`_\n🔺 _\`${mention}\`_`,
                    embeds: [
                        new MessageEmbed()
                        .setColor(0xFF69B4)
                        .setDescription("<:name:997088413687758888> **" + name.slice(0, (name.length/2).toFixed(0)) + mention.slice(((mention.length/2).toString().includes(".5") ? (mention.length/2).toFixed(0) - 1 : (mention.length/2).toFixed(0)))
                                        + `**\n**${match}%** ` + `${bar.join("")}` + ` ${text}`)
                    ]
                });
            }
        }
    },

    async progressBar(percent) {console.log("a")
        const bar = [];

        for(let i = 0; i < 10; i++){
            if(i == 0)
            {
                if(percent < 1) {bar.push("<:bar_start_empty:997085587125313556>"); continue;}
                if(percent <= 5 && percent > 0) {bar.push("<:bar_start_half:997085539457048586>"); continue;}
                if(percent > 5) {bar.push("<:bar_start_full:997085564371226705>"); continue;}
            }
            else if(i > 0 && i < 9)
            {
                if(percent <= (i * 10)) {bar.push("<:bar_empty:997086336613879838>"); continue;}
                if(percent < ((i + 1) * 10) && percent > (i * 10)) {bar.push("<:bar_half:997085504266838016>"); continue;}
                if(percent > ((i * 10) - 5)) {bar.push("<:bar_full:997085523678081135>"); continue;}
            }
            else if(i == 9)
            {
                if(percent <= 90) {bar.push("<:bar_end_empty:997086338144800768>"); continue;}
                if(percent < 100 && percent > 90) {bar.push("<:bar_end_empty:997086338144800768>"); continue;}
                if(percent == 100) {bar.push("<:bar_end_full:997085513498492988>"); continue;}
            }
        }

        return bar;
    },

    async text(percent) {
        let text;

        if(percent < 10) text = "Awful 😭";
        if(percent >= 10 && percent < 20) text = "Bad 😢";
        if(percent >= 20 && percent < 30) text = "Pretty Low 😦";
        if(percent >= 30 && percent < 40) text = "Not Too Great 😕";
        if(percent >= 40 && percent < 50) text = "Worse Than Average 😐";
        if(percent >= 50 && percent < 60) text = "Barely 😶";
        if(percent >= 60 && percent < 70 && percent != 69) text = "Not Bad 🙂";
        if(percent == 69) text = "( ͡° ͜ʖ ͡°)";
        if(percent >= 70 && percent < 80) text = "Pretty Good 😃";
        if(percent >= 80 && percent < 90) text = "Great 😄";
        if(percent >= 90 && percent < 100) text = "Amazing 😍";
        if(percent == 100) text = "PERFECT! ❣";
        
        return text;
    }
}