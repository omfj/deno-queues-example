import { kv } from "../kv.ts";
import { resultModel } from "../models/result.ts";
import { Queue } from "../queue.ts";

export const divide = new Queue<{ a: number; b: number }>(kv, {
  queueId: "q1",
  process: async ({ key, data }) => {
    const { a, b } = data;

    if (b === 0) {
      console.error(`Error: b is 0`);
      await resultModel.set(key, { success: false, message: `Error: b is 0` });
    } else {
      const res = a / b;
      console.log(`a = ${a}, b = ${b} => a / b = ${res}`);
      await resultModel.set(key, {
        success: true,
        message: String(res),
      });
    }
  },
});
