'use strict';
/*
  Sends information about the server and uptime (useful for debugging)

  Many thanks to https://github.com/howdyai/botkit/blob/master/slack_bot.js
  Where most of this was stolen from
*/

const os = require('os');

const uptime = (bot, message) => {
  const formatUptime = function(uptime) {
    var unit = 'second';
    if (uptime > 60) {
      uptime = uptime / 60;
      unit = 'minute';
    }
    if (uptime > 60) {
      uptime = uptime / 60;
      unit = 'hour';
    }
    if (uptime != 1) {
      unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
  };
  const hostname = os.hostname();
  const uptime = formatUptime(process.uptime());
  const reponse = ':robot_face: I am a bot named <@' + bot.identity.name +
          '>. I have been running for ' + uptime + ' on ' + hostname + '.';
  bot.reply(message, reponse);
};

module.exports = uptime;
