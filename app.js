"use strict";

const { App } = require("@slack/bolt");
const appRoot = require("app-root-path");
const fs = require("fs");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.message("welcome me", async ({ say }) => {
  const welcomeMessage = fs.readFileSync(`${appRoot}/welcome.txt`, "utf8");
  await say(welcomeMessage);
});

app.event("team_join", async ({ client, logger }) => {
  try {
    const welcomeMessage = fs.readFileSync(`${appRoot}/welcome.txt`, "utf8");
    await client.conversations.create({
      name: "welcome",
      is_private: true,
      text: welcomeMessage,
    });
  } catch (error) {
    logger.error(error);
  }
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);
  console.log("UCTech Greeter is running.");
})();
