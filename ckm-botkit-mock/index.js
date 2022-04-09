// This is derived from the MIT-licensed botkit-mock package.
// License: https://github.com/gratifyguy/botkit-mock/blob/40de54e7d4cbef3dd0219cbacad1a20ee311dfd4/LICENSE.md

'use strict';
const {Botkit} = require('botkit');
const {TurnContext} = require('botbuilder');

class BotMock extends Botkit {

  constructor(config) {
    super(config);
    this.detailed_answers = {};
    this.adapter._originSendActivities = this.adapter.sendActivities;
    this.adapter.sendActivities = this._sendActivities.bind(this);
  }

  /**
	 * Override of botkit.adapter.sendActivities to track history of sent messages.
	 * The function must be async because original fn botkit.adapter.sendActivities
	 * returns promise.
	 * @param context
	 * @param activities
	 * @returns {Promise<void>}
	 * @private
	 */
  async _sendActivities(context, activities) {
    for (const activity of activities) {
      this.detailed_answers[activity.conversation.id] = [activity];
    }
  }

  /**
	 * The function interpolate sequence of messages into events for botkit.
	 * @param userSequences
	 * @returns {Promise<void>}
	 */
  async usersInput(userSequences) {
    for (const userSequence of userSequences) {
      for (const message of userSequence.messages) {
        // build activity in botkit format
        const activity = {
          id: message.id || null,
          timestamp: new Date(),
          channelId: 'slack',
          conversation: {
            id: 'some-channel',
            team: 'some-team',
            thread_ts: null
          },
          from: {id: null},
          recipient: {id: message.recipient},
          channelData: {
            botkitEventType: userSequence.type,
            ...message
          },
          text: message.text,
          type: 'event'
        };

        const context = new TurnContext(this.adapter, activity);
        await this.adapter.runMiddleware(context, this.handleTurn.bind(this));

        if (message.isAssertion) {
          const messagesLog = this.detailed_answers[activity.conversation.id];
          let result = {};
          if (messagesLog) {
            const deepIndex = messagesLog.length - 1 - (message.deep || 0);
            result = messagesLog[deepIndex];
          }
          return result;
        }
      }
    }

    throw new Error('isAssert is missed in message sequence');
  }
}

module.exports = { BotMock };