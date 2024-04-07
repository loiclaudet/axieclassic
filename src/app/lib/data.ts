import { env } from "~/env";
import type { APIOptions, Battles } from "~/app/lib/definitions";

export async function getBattles(clientId: string, options: APIOptions = {}) {
  const limit = options.limit ?? 10;
  const offset = options.offset ?? 0;
  const response = await fetch(
    `https://api-gateway.skymavis.com/classic/v1/community/users/${clientId}/battle-histories?limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": env.X_API_KEY,
      },
    },
  );
  const data = (await response.json()) as Battles;
  return data;
}
