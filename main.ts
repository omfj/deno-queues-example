import { queueProcessor } from "./queue.ts";
import { kv } from "./kv.ts";
import { divide } from "./queues/divide.ts";
import { Hono } from "hono";
import { resultModel } from "./models/result.ts";

const numberOrNull = (value: unknown): number | null => {
  const n = Number(value);
  if (Number.isNaN(n)) {
    return null;
  }
  return n;
};

const app = new Hono();

app.get("/", async (c) => {
  const a = numberOrNull(c.req.query("a"));
  const b = numberOrNull(c.req.query("b"));

  if (a === null || b === null) {
    return c.text("Invalid query params");
  }

  const { key } = await divide.enqueue({ a, b });
  const res = await resultModel.poll(key);

  if (res === null) {
    return c.text("No result yet");
  }

  return c.json(res);
});

queueProcessor(kv, {
  queues: [divide],
});

export default app;
