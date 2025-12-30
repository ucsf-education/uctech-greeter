import type { App } from "@slack/bolt";

import events from "./events/index.js";
import messages from "./messages/index.js";

const registerListeners = (app: App) => {
  events.register(app);
  messages.register(app);
};

export default registerListeners;
