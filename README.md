A bot that hangs out in the UC Tech Slack team and welcomes new members as they join the workspace.

## Configuration

The bot expects the following environment variables.

| Variable Name          |          | Notes                      |
| ---------------------- | -------- | -------------------------- |
| `SLACK_BOT_TOKEN`      | required | Your bot token.            |
| `SLACK_SIGNING_SECRET` | required | Your app's signing secret. |

Add them to your `.env` file for local development, or as config variables to your hosting environment,
e.g. [Heroku](https://devcenter.heroku.com/articles/config-vars).

## Customizing the welcome message

Update `assets/welcome.txt` found in this project.

## Attribution

This bot was created using the [Bolt for TypeScript template
app](https://github.com/slack-samples/bolt-ts-starter-template).
