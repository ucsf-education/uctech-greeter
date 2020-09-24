'use strict';
if (!process.env.SLACK_API_TOKEN) {
  throw new Error('Specify SLACK_TOKEN in environment');
}

if (!process.env.SLACK_SIGNING_SECRET) {
  throw new Error('Specify SLACK_SIGNING_SECRET in environment');
}

const Botkit = require('botkit');
const controller = new Botkit.slackbot({
  debug: false,
  require_delivery: true,
  clientSigningSecret: process.env.SLACK_SIGNING_SECRET,
});
controller.spawn({
  token: process.env.SLACK_API_TOKEN
}).startRTM();

module.exports = controller;
