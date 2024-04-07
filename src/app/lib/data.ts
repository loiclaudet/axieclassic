import { env } from "~/env";
import type {
  Leaderboard,
  APIOptions,
  Battles,
  APIError,
} from "~/app/lib/definitions";

export async function getBattles(
  clientId: string,
  options: APIOptions = {},
): Promise<Battles | APIError> {
  const limit = options.limit ?? 10;
  const offset = options.offset ?? 0;

  try {
    const response = await fetch(
      `https://api-gateway.skymavis.com/classic/v1/community/users/${clientId}/battle-histories?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": env.X_API_KEY,
        },
        next: {
          revalidate: 600, // revalidate every at most 10 minutes
        },
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        // Handle rate limiting
        return {
          error: true,
          status: 429,
          message: "Rate limit exceeded. Please try again later.",
        };
      }
      // Handle other errors
      return {
        error: true,
        status: response.status,
        message: "An error occurred while fetching battles.",
      };
    }

    const data = (await response.json()) as Battles;
    return data;
  } catch (error) {
    // Handle network or other unexpected errors
    return {
      error: true,
      status: 0,
      message: "Network error or unexpected error occurred.",
    };
  }
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
