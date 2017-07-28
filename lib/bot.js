'use strict';
if (!process.env.SLACK_API_TOKEN) {
  throw new Error('Error: Specify SLACK_TOKEN in environment');
}

const Botkit = require('botkit');
const controller = Botkit.slackbot({
  debug: false,
  require_delivery: true,
});
controller.spawn({
  token: process.env.SLACK_API_TOKEN
}).startRTM();

module.exports = controller;
