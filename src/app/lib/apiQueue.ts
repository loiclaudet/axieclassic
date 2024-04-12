import PQueue from "p-queue";
import { X_RATELIMIT_LIMIT_SECOND } from "~/app/lib/constant";

export const apiQueue = new PQueue({
  concurrency: X_RATELIMIT_LIMIT_SECOND,
  interval: 1100,
  intervalCap: X_RATELIMIT_LIMIT_SECOND,
});
