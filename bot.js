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
    Logging.logMessageDelete(message);
});

bot.on('messageUpdate', (oldMessage, newMessage) => {
    Logging.logMessageUpdate(oldMessage, newMessage);
});

bot.on('guildBanAdd', (guild, user) => {
    Logging.logUserBan(user, guild);
});

bot.login(settings['BOT_LOGIN_TOKEN']);
