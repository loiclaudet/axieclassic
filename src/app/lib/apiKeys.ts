import { env } from "~/env";

const apiKeys = [env.X_API_KEY, env.X_API_KEY_2];
let concurrentAPIKeyIndex = 0;

export const getNextAPIKey = () => {
  concurrentAPIKeyIndex = (concurrentAPIKeyIndex + 1) % apiKeys.length;
  return apiKeys[concurrentAPIKeyIndex]!;
};

export const apiKeysLength = apiKeys.length;
