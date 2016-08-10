A bot that welcomes new users to the UCTech team on Slack.

## Installation

Clone this project. 

Then, [create a bot user integration](https://my.slack.com/services/new/bot).
Take note of the generated API token.

Now, install all dependencies.

```bash
npm install
```

Finally, run this application whilst passing the API token to it.

```bash
# Replace xxx-xxx-xxxxx with the bot's API token.
SLACK_API_TOKEN=xxx-xxx-xxxxx node index.js
```

## Deployment 

[How to deploy your Slack Bot to Heroku.](https://blog.heroku.com/how-to-deploy-your-slack-bots-to-heroku)
