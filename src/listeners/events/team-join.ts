import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import getWelcomeMessage from "../../utils.js";

const teamJoinCallback = async ({
  event,
  client,
  logger,
}: AllMiddlewareArgs & SlackEventMiddlewareArgs<"team_join">) => {
  const userId = event.user.id;
  try {
    await client.chat.postMessage({
      channel: userId,
      text: getWelcomeMessage(),
    });
  } catch (e) {
    logger.error(e);
  }
};

export default teamJoinCallback;
