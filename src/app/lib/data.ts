import { env } from "~/env";
import type { Leaderboard, APIOptions, Battles } from "~/app/lib/definitions";

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
      next: {
        // revalidate every at most  10 minutes
        revalidate: 600,
      },
    },
  );

  const data = (await response.json()) as Battles;
  return data;
}

export async function getLeaderboard(options: APIOptions = {}) {
  const limit = options.limit ?? 50;
  const offset = options.offset ?? 0;

  const response = await fetch(
    `https://axie-classic.skymavis.com/v1/leaderboards?limit=${limit}&offset=${offset}`,
    {
      next: {
        // revalidate every at most  10 minutes
        revalidate: 600,
      },
    },
  );

  const data = (await response.json()) as Leaderboard;
  return data;
}
