import type {
  Leaderboard,
  APIOptions,
  Battles,
  APIError,
  Season,
} from "~/app/lib/definitions";
import { apiQueue } from "./apiQueue";
import { getNextAPIKey } from "~/app/lib/apiKeys";

export async function getSeason(): Promise<Season | APIError> {
  try {
    const response = await fetch(
      "https://guildwar.axiedao.org/api/getGuildSeasonInfo",
    );
    const data = (await response.json()) as Season;
    return data;
  } catch (error) {
    console.error(error);
    return {
      error: true,
      status: 500,
      message: "Error fetching Season data.",
    };
  }
}

export async function getBattles(
  clientId: string,
  options: APIOptions = {},
): Promise<Battles | APIError> {
  const run = async () => {
    const response = await fetchBattles(clientId, options);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = (await response.json()) as Battles;
    return data;
  };

  try {
    const result = await apiQueue.add(run);

    if (!result) {
      throw new Error("No result");
    }

    return result;
  } catch (error) {
    console.error(error);
    return {
      error: true,
      status: 500,
      message: "Error fetching battles.",
    };
  }
}

async function fetchBattles(clientId: string, options: APIOptions = {}) {
  const limit = options.limit ?? 10;
  const offset = options.offset ?? 0;

  const response = await fetch(
    `https://api-gateway.skymavis.com/classic/v1/community/users/${clientId}/battle-histories?limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": getNextAPIKey(),
      },
    },
  );

  return response;
}

export async function getLeaderboard(options: APIOptions = {}) {
  const limit = options.limit ?? 50;
  const offset = options.offset ?? 0;

  const response = await fetch(
    `https://axie-classic.skymavis.com/v1/leaderboards?limit=${limit}&offset=${offset}`,
  );

  const data = (await response.json()) as Leaderboard;
  return data;
}
