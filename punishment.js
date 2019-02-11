const NoSwearing = require("noswearing");

var bannedUsers = {};
const MAX_WARNINGS = 1;

module.exports = {
  doleOutPunishment: function(bot, member, guild, word) {
    if (!bannedUsers[guild.id]) {
      bannedUsers[guild.id] = {};
    }
    var warnings = bannedUsers[guild.id][member.id];
    if (!warnings) {
      this.warnUser(bot, member,word);
      bannedUsers[guild.id][member.id] = 1;
    } else if (warnings < MAX_WARNINGS) {
      this.warnUser(bot, member,word);
      bannedUsers[guild.id][member.id]++;
    } else if (warnings == MAX_WARNINGS) {
      this.banUser(member);
      bannedUsers[guild.id][member.id] = 0;
    }
  },

  banUser: function(member) {
    member.user.send('You have been banned for posting profanity.');
    member.ban(7).catch(console.error);
  },

  warnUser: function(bot, member,word) {
    bot.fetchUser(member.id).then(user => user.send('Your message has been deleted for profanity and logged. You said "' + word.original + '"' + (word.original == word.word ? "" : (' which sounds like "' + word.word + '"'))));
  },

  checkProfanity: function(message) {
    var result = NoSwearing(message);
    for (var i = 0; i < result.length; i++)
      if (result[i].info == 2) return result[i];
  },
};
