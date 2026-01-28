import type {
  RankedUsersResponse,
  APIOptions,
  Battles,
  APIError,
  GuildSeason,
  Profile,
  RankedUser,
  Player,
  BattleWithProfiles,
  AxieDetailsResponse,
  Axie,
  Reward,
} from "~/lib/definitions";
import { apiQueue } from "~/lib/apiQueue";
import { getNextAPIKey } from "~/lib/apiKeys";
import { MAXIMUM_PLAYERS_API_LIMIT } from "~/lib/constant";
import { getProfiles } from "~/data/profile";
import { sleep } from "~/lib/utils";

function getSeasonRewardsOverride(
  season: number,
  rank: number,
): number | undefined {
  if (season !== 142) return undefined;

  if (rank === 1) return 2_500_000;
  if (rank === 2) return 2_000_000;
  if (rank === 3) return 1_750_000;
  if (rank >= 4 && rank <= 10) return 750_000;
  if (rank >= 11 && rank <= 25) return 500_000;
  if (rank >= 26 && rank <= 50) return 400_000;
  if (rank >= 51 && rank <= 75) return 340_000;
  if (rank >= 76 && rank <= 100) return 300_000;

  return undefined;
}

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

export async function getProfileBattles(
  clientId: string,
  options: APIOptions = {},
): Promise<BattleWithProfiles[] | APIError> {
  try {
    const battles = (await fetchBattlesWithBackoff(clientId, options)).items;

    const opponentsIDs = battles.map((battle) => {
      const opponentTeam = battle.team.find((t) => t.owner !== clientId)!;
      return opponentTeam.owner;
    });
    const [opponentsProfiles, clientProfiles] = await Promise.all([
      getProfiles(opponentsIDs),
      getProfiles([clientId]),
    ]);

    if ("error" in opponentsProfiles || "error" in clientProfiles) {
      throw new Error("Error fetching profiles.");
    }

    const clientProfile = clientProfiles[0]!;

    const battlesWithProfiles = battles.map((battle) => ({
      ...battle,
      clientProfile,
      opponentProfile: opponentsProfiles.find((op) => {
        const opponentTeam = battle.team.find(
          (t) => t.owner !== clientProfile.clientID,
        )!;
        const opponentID = opponentTeam.owner;
        return op.clientID === opponentID;
      })!,
    }));

    return battlesWithProfiles;
  } catch (e) {
    return {
      error: true,
      status: 500,
      message: "Error fetching profile battles.",
    };
  }
}

export async function getArenaBattles(
  clientId: string,
  options: APIOptions = {},
): Promise<Battles | APIError> {
  const run = async () => {
    const battles = await fetchBattlesWithBackoff(clientId, options);

    return battles;
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

async function fetchBattlesWithBackoff(
  clientId: string,
  options: APIOptions = {},
  retries = 3,
): Promise<Battles> {
  try {
    return await fetchBattles(clientId, options);
  } catch (error) {
    if (retries > 0) {
      const delay = Math.pow(2, 4 - retries) * 1000;
      await sleep(delay);
      return await fetchBattlesWithBackoff(clientId, options, retries - 1);
    }

    throw error;
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
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as Battles;

  return data;
}

export async function getPlayers(
  page: 1 | 2 = 1,
): Promise<Player[] | APIError> {
  try {
    const [rankedUsersResult, guildSeasonResult] = await Promise.all([
      getTop100RankedUsers(),
      getGuildSeason(),
    ]);

    if ("error" in guildSeasonResult) {
      throw new Error("Failed to fetch guild season");
    }

    const allRankedUsers = rankedUsersResult as RankedUser[];
    const rankedUsers = allRankedUsers.slice(
      (page - 1) * MAXIMUM_PLAYERS_API_LIMIT,
      page * MAXIMUM_PLAYERS_API_LIMIT,
    );

    // Create a map of rank -> reward amount from guild season rewards
    const rewardsByRank = new Map<number, number>();
    guildSeasonResult.rewards.forEach((reward: Reward) => {
      rewardsByRank.set(reward.rank, reward.amount);
    });

    const profiles = (await getProfiles(
      rankedUsers.map((user) => user.clientID),
    )) as Profile[];

    const players = rankedUsers.map((user) => {
      const profile = profiles.find((p) => p.clientID === user.clientID)!;
      return {
        ...profile,
        ...user,
        reward:
          getSeasonRewardsOverride(guildSeasonResult.season, user.rank) ??
          rewardsByRank.get(user.rank) ??
          0,
      };
    });

    return players;
  } catch (error) {
    console.error(error);
    return {
      error: true,
      status: 500,
      message: "Arena leaderboard is unavailable during the off-season.",
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

export const getAxie = async (axieId: string): Promise<Axie | APIError> => {
  const response = await fetch(
    "https://api-gateway.skymavis.com/graphql/axie-marketplace",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.X_API_KEY_4!,
      },
      body: JSON.stringify({
        variables: { axieId },
        query:
          "query GetAxieDetail($axieId: ID!) { axie(axieId: $axieId) { parts { type class id } class stats { hp morale skill speed } }}",
      }),
      next: {
        tags: [`axie-${axieId}`],
        revalidate: false,
      },
    },
  );

  if (!response.ok) {
    return {
      error: true,
      status: response.status,
      message: "Failed to fetch axie",
    };
  }

  const axieDetails = (await response.json()) as AxieDetailsResponse;

  return axieDetails.data.axie;
};
