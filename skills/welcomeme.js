'use strict';

/*
  Sends the welcome message to an existing user
*/

const fs = require('fs');

const welcomeme = (bot, message) => {
  const appRoot = require('app-root-path');
  const welcomeMessage = fs.readFileSync(`${appRoot}/welcome.txt`, 'utf8');
  bot.reply(message, welcomeMessage);
};

module.exports = welcomeme;
