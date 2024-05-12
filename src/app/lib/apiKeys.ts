import { env } from "~/env";

export const apiKeys =
  process.env.NODE_ENV === "development"
    ? [env.X_API_KEY_DEV]
    : [env.X_API_KEY, env.X_API_KEY_2, env.X_API_KEY_3];

let concurrentAPIKeyIndex = 0;

export const getNextAPIKey = () => {
  concurrentAPIKeyIndex = (concurrentAPIKeyIndex + 1) % apiKeys.length;
  return apiKeys[concurrentAPIKeyIndex]!;
};

export const apiKeysLength = apiKeys.length;
