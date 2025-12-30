import { App } from "@slack/bolt";
import teamJoinCallback from "./team-join.js";

const register = (app: App) => {
  app.event("team_join", teamJoinCallback);
};

export default { register };
