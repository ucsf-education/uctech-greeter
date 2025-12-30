import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import getWelcomeMessage from "../../utils.js";

const welcomeMeCallback = async ({
  logger,
  say,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"message">) => {
  try {
    await say(getWelcomeMessage());
  } catch (e) {
    logger.error(e);
  }
};

export default welcomeMeCallback;
