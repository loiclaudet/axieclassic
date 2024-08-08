import type {
  RankedUsersResponse,
  APIOptions,
  Battles,
  APIError,
  GuildSeason,
  ClientID,
  ProfilesResponse,
  Profile,
  RankedUser,
  Player,
} from "~/lib/definitions";
import { apiQueue } from "~/lib/apiQueue";
import { getNextAPIKey } from "~/lib/apiKeys";
import { MAXIMUM_PLAYERS_API_LIMIT } from "~/lib/constant";
import { chunk } from "src/lib/utils";

export async function getGuildSeason(): Promise<GuildSeason | APIError> {
  try {
    const response = await fetch(
      "https://axie-classic.skymavis.com/v1/guild-seasons",
    );
    const data = (await response.json()) as GuildSeason;
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
      cache: "no-store",
    },
  );

  return response;
}

export async function getPlayers(): Promise<Player[] | APIError> {
  try {
    const rankedUsers = ((await getTop100RankedUsers()) as RankedUser[]).slice(
      0,
      MAXIMUM_PLAYERS_API_LIMIT,
    );

    const profiles = (await getProfiles(
      rankedUsers.map((user) => user.clientID),
    )) as Profile[];

    const players = rankedUsers.map((user) => {
      const profile = profiles.find((p) => p.clientID === user.clientID)!;
      return {
        ...profile,
        ...user,
      };
    });

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

export async function getProfile(
  clientID: string,
): Promise<Profile | APIError> {
  try {
    const response = await fetch(
      `https://axie-classic.skymavis.com/v1/players/profile?clientIDs=${clientID}`,
    );

    const data = (await response.json()) as ProfilesResponse;
    return data.items[0] as Profile;
  } catch (error) {
    console.error(error);
    return {
      error: true,
      status: 500,
      message: "Error fetching profile.",
    };
  }
}
