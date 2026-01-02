import { mock } from "node:test";
import { WebClient } from "@slack/web-api";

export const fakeLogger = {
  debug: mock.fn(),
  info: mock.fn(),
  warn: mock.fn(),
  error: mock.fn(),
  resetCalls() {
    fakeLogger.debug.mock.resetCalls();
    fakeLogger.info.mock.resetCalls();
    fakeLogger.warn.mock.resetCalls();
    fakeLogger.error.mock.resetCalls();
  },
};
export const fakeClient = new WebClient("xoxb-example");
export const fakeSay = mock.fn();
