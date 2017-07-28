A bot that hangs out in the UC Tech Slack team and helps with common tasks

## Running Locally:

1. Install node and npm
2. `git clone uctechbot`
3. `npm install`
4. add a `.env` file with:
```bash
SLACK_API_TOKEN="TOKEN"
```
5. Run uctechbot with `npm start`
5. test uctechbot with `npm test`


## Deploying to heroku
1. Install the heroku CLI (`brew install heroku`)
2. `heroku create`
3. `git push heroku master`
4. `heroku config:set SLACK_API_TOKEN="TOKEN"`
