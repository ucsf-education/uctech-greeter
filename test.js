'use strict';
const assert = require('assert');

const welcomeText =  require('fs').readFileSync(require('path').join(__dirname, 'welcome.txt'), 'utf8');


// Bot tests
{
  // Bot throws if there is no API token.
  assert.throws(
    () => { delete process.env.SLACK_API_TOKEN; require('./lib/bot.js'); },
    { message: 'Error: Specify SLACK_TOKEN in environment' }
  );
}

// Monkey-patch bot.reply to make a test double for remaining tests.
process.env.SLACK_API_TOKEN='fhqwhgads';
const bot = require('./lib/bot.js');

// Counter for test completion.
let done = 0;

// Uptime tests
{
  bot.identity = { name: 'Fhqwhgads' };
  bot.reply = (message, response) => {
    assert.strictEqual('message', message);
    assert.match(
      response,
      /^:robot_face: I am a bot named <@Fhqwhgads>. I have been running for /
    );
    done++;
  };

  const uptime = require('./skills/uptime');
  uptime(bot, 'message');
}

// Welcome tests
{
  bot.startPrivateConversation = (_, callback) => {
    setTimeout(() => { callback(null, { say: (welcome) => {
      assert.strictEqual(welcome, welcomeText);
      done++;
    }}); }, 100);
  };

  const welcome = require('./skills/welcome');
  welcome(bot, { user: { id: 42 } });
}

// Welcome Me tests
{
  bot.reply = (message, response) => {
    assert.strictEqual(message, 'message');
    assert.strictEqual(response, welcomeText);
    done++;
  };

  const welcomeMe = require('./skills/welcomeme');
  welcomeMe(bot, 'message');
}

process.on('exit', () => {
  assert.strictEqual(done, 3);
});
