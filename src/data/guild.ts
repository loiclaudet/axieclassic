import type {
  APIError,
  APIOptions,
  Guild,
  GuildsLeaderboardResponse,
  GuildUser,
  GuilUsersResponse,
  RankedGuild,
} from "~/lib/definitions";

export const getGuild = async (guildId: string): Promise<Guild | APIError> => {
  const response = await fetch(
    `https://axie-classic.skymavis.com/v1/guilds/${guildId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    return {
      error: true,
      status: response.status,
      message: "Failed to fetch guild",
    };
  }

  const guild = (await response.json()) as Guild;

  return guild;
};

export const getGuildUsers = async (
  guildId: string,
): Promise<GuildUser[] | APIError> => {
  const response = await fetch(
    `https://axie-classic.skymavis.com/v1/guilds/${guildId}/users`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    return {
      error: true,
      status: response.status,
      message: "Failed to fetch guild users",
    };
  }

  const guildUsers = (await response.json()) as GuilUsersResponse;

  return guildUsers.items;
};

export const getGuildsLeaderboard = async (
  options?: APIOptions,
): Promise<RankedGuild[] | APIError> => {
  const limit = options?.limit ?? 50;
  const offset = options?.offset ?? 0;
  const response = await fetch(
    `https://axie-classic.skymavis.com/v1/guild-seasons/leaderboard?limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    return {
      error: true,
      status: response.status,
      message: "Failed to fetch guilds leaderboard",
    };
  }

  const guildsLeaderboard =
    (await response.json()) as GuildsLeaderboardResponse;

  return guildsLeaderboard.items;
};
