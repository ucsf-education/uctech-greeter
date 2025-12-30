import { strict as assert } from "node:assert";
import { beforeEach, describe, it, mock } from "node:test";
import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";

import welcomeMeCallback from "../../src/listeners/messages/welcome-me";
import { fakeLogger, fakeSay } from "../helpers";

const buildArguments = ({ logger = fakeLogger, say = fakeSay }) => {
  return {
    logger,
    say,
  } as unknown as AllMiddlewareArgs & SlackEventMiddlewareArgs<"message">;
};

describe("messages", () => {
  beforeEach(() => {
    fakeLogger.resetCalls();
    fakeSay.mock.resetCalls();
  });
  it("should call say with greeting response", async () => {
    await welcomeMeCallback(buildArguments({}));
    assert(fakeSay.mock.callCount() === 1);
    const callArgs = fakeSay.mock.calls[0]?.arguments[0];
    assert(callArgs?.toString().includes("Welcome to UCTech"));
  });
  it("should log error when say throws exception", async () => {
    const testError = new Error("test exception");
    const say = mock.fn(() => {
      throw testError;
    });
    await welcomeMeCallback(
      buildArguments({
        say,
      }),
    );
    assert(say.mock.callCount() === 1);
    assert.deepEqual(fakeLogger.error.mock.calls[0]?.arguments, [testError]);
  });
});
