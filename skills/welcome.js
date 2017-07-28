'use strict';

/*
  Welcomes new users to the team by sending them a private message containing
  the contents of /welcome.txt
*/

const fs = require('fs');

const welcome = (bot, message) => {
  bot.startPrivateConversation({user: message.user.id}, function(err, convo) {
    const appRoot = require('app-root-path');
    const welcome = fs.readFileSync(`${appRoot}/welcome.txt`, 'utf8');
    convo.say(welcome);
  });
};

module.exports = welcome;
