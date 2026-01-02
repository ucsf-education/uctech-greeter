import { App, LogLevel } from "@slack/bolt";
import "dotenv/config";
import registerListeners from "./listeners/index.js";

/** Initialization */
const app = new App({
  token: process.env["SLACK_BOT_TOKEN"],
  signingSecret: process.env["SLACK_SIGNING_SECRET"],
  logLevel: LogLevel.DEBUG,
});

/** Register Listeners */
registerListeners(app);

/** Start Bolt App */
(async () => {
  try {
    await app.start(process.env["PORT"] || 3000);
    app.logger.info("Greeterbot is running.️");
  } catch (error) {
    app.logger.error("Unable to start Greeterbot", error);
  }
})();
