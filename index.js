var fs = require('fs');
var express = require('express')();
var http = require('http').Server(express);
var RtmClient = require('@slack/client').RtmClient;
var WebClient = require('@slack/client').WebClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var bodyParser = require('body-parser');


var token = process.env.SLACK_API_TOKEN || '';
var welcome = fs.readFileSync('welcome.txt', 'utf8');
var rtm = new RtmClient(token);
var web = new WebClient(token);

rtm.start();

rtm.on(RTM_EVENTS.TEAM_JOIN, function(message) {
  var user = message.user;
  console.log('User ' + user.name + ' joined the team.');
  web.im.open(user.id, function(err, res) {
    if (err) {
      console.error('An error occurred while opening a direct message channel to user ' + user.name + '. Error: ' + err);
      return;
    }
    if (res.ok) {
      rtm.sendMessage(welcome, res.channel.id);
    } else {
      console.error('Failed to open a direct message channel to user ' + user.name + '. Error message: ' + res.error);
    }
  });
});


// register middleware
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({ extended: true }));

// serve up something at the default route so Heroku won't crash
express.set('port', process.env.PORT || 5000);
express.get('/', function(req, res) {
  res.send("42");
});

// custom command endpoint. prints out the welcome message.
express.post('/welcome-message', function (req, res) {
  if (req.body.token === process.env.SLACK_WELCOMEMESSAGE_COMMAND_TOKEN) {
    res.send(welcome);
    return;
  }
  res.status(403).send('Access Denied.');
});

express.listen(express.get('port'), function() {
  console.log('App is running on port', express.get('port'));
});
