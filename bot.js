const Punishment = require('./punishment.js');
const Logging = require('./logging.js');


const Discord = require('discord.js');
const settings = require('./settings.json');
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('I am ready to make your server a better place!');
});

bot.on('message', message => {
    if (
        message.author != bot.user &&
        message.channel.type != 'dm'
    ) {
        var word = Punishment.checkProfanity(message.content);
        if (word) {
            message.delete().then(msg => {
                Punishment.doleOutPunishment(bot, msg.member, msg.guild, word);
            });
        }
    }
});

bot.on('messageDelete', message => {
    try {
    Logging.logMessageDelete(message);
    } catch(e) {
console.log(e)
    }
});

bot.on('messageUpdate', (oldMessage, newMessage) => {
    try {
    Logging.logMessageUpdate(oldMessage, newMessage);
    } catch(e) {
console.log(e)
    }
});

bot.on('guildBanAdd', (guild, user) => {
    try {
    Logging.logUserBan(user, guild);
    } catch(e) {
console.log(e)
    }
});

bot.on('error', console.error);

bot.login(settings['BOT_LOGIN_TOKEN']);
