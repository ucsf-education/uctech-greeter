'use strict';
const assert = require('assert');
const { BotMock } = require('../ckm-botkit-mock');
const {SlackAdapter, SlackMessageTypeMiddleware, SlackEventMiddleware} = require('botbuilder-adapter-slack');

const yourController = require('./../features/greeter');

describe('greeter', function() {
  let controller;

  beforeEach(function() {
    const adapter = new SlackAdapter({
      clientSigningSecret: 'clientSigningSecretMock',
      getTokenForTeam: ()=> 'mock-token',
      getBotUserByTeam: ()=> 'mock-user',
      clientId: 'clientId-mock',
      clientSecret: 'clientSecret-mock',
      scopes: 'scopes-mock',
      redirectUri: 'redirectUri-mock',
    });

    adapter.use(new SlackEventMiddleware());
    adapter.use(new SlackMessageTypeMiddleware());

    controller = new BotMock({
      adapter: adapter,
      disable_console: true,
      disable_webserver: true
    });

    yourController(controller);
  });
  describe('controller hears "welcome me"', function() {
    it('should reply with welcome message in direct message', async function() {
      const reply = await controller.usersInput([
        {
          type: 'direct_message',
          messages: [
            {
              text: 'welcome me',
              isAssertion: true,
            }
          ]
        }
      ]);

      assert.ok(reply.text.includes('Welcome to UCTech!'));
    });
    it('should reply with welcome message when mentioned', async function() {
      const reply = await controller.usersInput([
        {
          type: 'mention',
          messages: [
            {
              text: 'welcome me',
              isAssertion: true,
            }
          ]
        }
      ]);

      assert.ok(reply.text.includes('Welcome to UCTech!'));
    });
    it('should reply with welcome message when mentioned directly', async function() {
      const reply = await controller.usersInput([
        {
          type: 'direct_mention',
          messages: [
            {
              text: 'welcome me',
              isAssertion: true,
            }
          ]
        }
      ]);
      assert.ok(reply.text.includes('Welcome to UCTech!'));
    });
  });
});
