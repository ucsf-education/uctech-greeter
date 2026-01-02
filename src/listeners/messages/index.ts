import type { App } from "@slack/bolt";
import welcomeMeCallback from "./welcome-me.js";

const register = (app: App) => {
  app.message("welcome me", welcomeMeCallback);
};

export { welcomeMeCallback };
export default { register };
