const csgo = "1073625343526707320";
const apex = "1073626827421130762";
const genshin = "1073626024916557964";
const lol = "1073627875485421619";
const mc = "1073628023867314186";
const ow = "1073626831942590555";
const valo = "1073628427204169808";

module.exports = async (client, reaction, user) => {
    const { message, emoji } = reaction;
    
    if(message.id == "1073659815383011359") {
        const csgoRole = message.guild.roles.cache.find(role => role.id === "1072856272375906336");
        const apexRole = message.guild.roles.cache.find(role => role.id === "1072855348240715819");
        const genshinRole = message.guild.roles.cache.find(role => role.id === "1066314665912700958");
        const lolRole = message.guild.roles.cache.find(role => role.id === "1072855596941975622");
        const mcRole = message.guild.roles.cache.find(role => role.id === "1042123749773803611");
        const owRole = message.guild.roles.cache.find(role => role.id === "1032290462016491562");
        const valoRole = message.guild.roles.cache.find(role => role.id === "1072855909866414162");
    
        const member = message.guild.members.cache.get(user.id);
    
        if(emoji.id == csgo) await member.roles.add(csgoRole);
        if(emoji.id == apex) await member.roles.add(apexRole);
        if(emoji.id == genshin) await member.roles.add(genshinRole);
        if(emoji.id == lol) await member.roles.add(lolRole);
        if(emoji.id == mc) await member.roles.add(mcRole);
        if(emoji.id == ow) await member.roles.add(owRole);
        if(emoji.id == valo) await member.roles.add(valoRole);
    }
}