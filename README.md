A bot that hangs out in the UC Tech Slack team and helps with common tasks

## Running Locally:

1. Install node and npm
2. `git clone https://github.com/stopfstedt/uctech-greeter.git`
3. `cd uctech-greeter`
4. `npm install`
5. add a `.env` file with:
```bash
SLACK_API_TOKEN="TOKEN"
```
6. Run uctechbot with `npm start`
7. test uctechbot with `npm test`


## Deploying to heroku
1. Install the heroku CLI (`brew install heroku`)
2. `heroku create`
3. `git push heroku master`
4. `heroku config:set SLACK_API_TOKEN="TOKEN"`
