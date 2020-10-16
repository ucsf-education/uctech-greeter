'use strict';
const appRoot = require('app-root-path');
const fs = require('fs');

module.exports = function(controller) {
  controller.hears(['welcome me'], ['direct_message', 'direct_mention', 'mention'], async(bot, message) => {
    const welcomeMessage = fs.readFileSync(`${appRoot}/welcome.txt`, 'utf8');
    await bot.reply(message, welcomeMessage);
  });

  controller.on('team_join', async(bot, message) => {
    await bot.startPrivateConversation(message.user.id);
    const welcomeMessage = fs.readFileSync(`${appRoot}/welcome.txt`, 'utf8');
    await bot.say(welcomeMessage);
  });
};
