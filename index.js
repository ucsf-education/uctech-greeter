var SlackBot = require('slackbots');
var fs = require('fs');
var express = require('express')();
var http = require('http').Server(express);

var bot = new SlackBot({
  token: process.env.SLACK_TOKEN || '',
  name: process.env.BOT_NAME || 'greeterbot'
});

bot.on('message', function(data) {
  var self = this;
  // @link https://api.slack.com/events/team_join
  if ('team_join' === data.type) {
    setTimeout(function() {
      var message = fs.readFileSync('welcome.txt', 'utf8');
      self.postMessageToUser(data.user.name, message, { as_user: true });
    }, 45000);
    console.log("'" + data.user.name + "' has joined the team.");
  }
});

// serve up something so Heroku won't crash
express.set('port', process.env.PORT || 5000);
express.get('/', function(req, res) {
  res.send("42");
});
express.listen(express.get('port'), function() {
  console.log('App is running on port', express.get('port'));
});
