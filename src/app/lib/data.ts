import type {
  RankedUsersResponse,
  APIOptions,
  Battles,
  APIError,
  Season,
  ClientID,
  ProfilesResponse,
  Profile,
  RankedUser,
  Player,
} from "~/app/lib/definitions";
import { apiQueue } from "./apiQueue";
import { getNextAPIKey } from "~/app/lib/apiKeys";
import { MAXIMUM_PLAYERS_API_LIMIT } from "./constant";
import { chunk } from "src/app/utils";

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

export async function getPlayers(): Promise<Player[] | APIError> {
  try {
    const rankedUsers = (await getTop100RankedUsers()) as RankedUser[];
    const profiles = (await getProfiles(
      rankedUsers.map((user) => user.clientID),
    )) as Profile[];

    const players = profiles.map((profile, index) => ({
      ...profile,
      ...rankedUsers[index]!,
    }));

    return players;
  } catch (error) {
    console.error(error);
    return {
      error: true,
      status: 500,
      message: "Error fetching players.",
    };
  }
}

export async function getTop100RankedUsers(): Promise<RankedUser[] | APIError> {
  // fetch top 100 ranked users
  // there is no pagination for this endpoint :(
  const response = await fetch(
    `https://axie-classic.skymavis.com/v1/season/leaderboard`,
  );

  const data = (await response.json()) as RankedUsersResponse;
  return data.items;
}

export async function getProfiles(
  profileClientIDs: ClientID[],
): Promise<Profile[] | APIError> {
  const endpoints = chunk(profileClientIDs, MAXIMUM_PLAYERS_API_LIMIT).flatMap(
    createProfilesEndpoint,
  );

  const profiles = (await Promise.all(endpoints.map(fetchProfiles))).flat();
  return profiles;
}

async function fetchProfiles(profilesEndpoint: string) {
  const response = await fetch(profilesEndpoint);
  const data = (await response.json()) as ProfilesResponse;
  return data.items;
}

function createProfilesEndpoint(clientIDs: ClientID[]): string {
  return (
    "https://axie-classic.skymavis.com/v1/players/profile?" +
    clientIDs.map((p) => "clientIDs=" + p).join("&")
  );
}
