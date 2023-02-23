module.exports = {
    async send(message, type, content) {
        if(!type) {
            return message.channel.send(content);
        } else {
            return message.editReply(content);
        }
    },
    
    async reply(message, type, content) {
        if(!type) {
            return message.reply(content);
        } else {
            return message.editReply(content);
        }
    }
}