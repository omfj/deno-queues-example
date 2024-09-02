import { kv } from "../kv.ts";
import { Model } from "../model.ts";

export const resultModel = new Model<{
  success: boolean;
  message: string;
}>(kv, {
  prefix: "result",
});
