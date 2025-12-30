import { strict as assert } from "node:assert";
import { beforeEach, describe, it, mock } from "node:test";
import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from "@slack/bolt";
import type { WebClient } from "@slack/web-api";

import teamJoinCallback from "../../src/listeners/events/team-join";
import { fakeClient, fakeLogger } from "../helpers";

const fakeEvent = {
  user: {
    id: "123",
  },
};

const buildArguments = ({
  client = fakeClient,
  event = fakeEvent,
  logger = fakeLogger,
}: {
  client?: WebClient;
  event?: Record<string, unknown>;
  logger?: typeof fakeLogger;
}): AllMiddlewareArgs & SlackEventMiddlewareArgs<"team_join"> => {
  return {
    client,
    event,
    logger,
  } as unknown as AllMiddlewareArgs & SlackEventMiddlewareArgs<"team_join">;
};

describe("events", () => {
  beforeEach(() => {
    fakeLogger.resetCalls();
  });

  it("should send the welcome message when new user joins the team", async () => {
    const spy = mock.method(fakeClient.chat, "postMessage", async () => ({
      ok: true,
    }));

    await teamJoinCallback(buildArguments({}));

    assert(spy.mock.callCount() === 1);

    const callArgs = spy.mock.calls[0].arguments[0];
    assert(callArgs);
    assert.ok(callArgs.text.toString().includes("Welcome to UCTech"));
    assert.equal(callArgs.channel, fakeEvent.user.id);
  });

  it("should log error when chat.postMessage throws exception", async () => {
    const testError = new Error("test exception");
    const spy = mock.method(fakeClient.chat, "postMessage", async () => {
      throw testError;
    });

    await teamJoinCallback(buildArguments({}));

    assert(spy.mock.callCount() === 1);
    assert.deepEqual(fakeLogger.error.mock.calls[0].arguments, [testError]);
  });
});
