export type Battles = {
  items: Battle[];
};

export type Battle = {
  uuid: string;
  clientID: ClientID;
  winner: ClientID;
  pvpType: PvpType;
  team: [Team, Team];
  createdAt: string;
};

export type BattleWithProfiles = Battle & {
  clientProfile: Profile;
  opponentProfile: Profile;
};

export type PvpType = "tournament" | "arena" | "colosseum" | "challenge";

export type Team = {
  id: string;
  name: string;
  owner: ClientID;
  fighterIDs: FighterIDs;
  index: number;
};

export type FighterIDs = [number, number, number];

export type ClientID = string;
export type GuildID = string;

export type RankedUsersResponse = {
  items: RankedUser[];
};

export type RankedUser = {
  clientID: ClientID;
  rank: number;
  score: number;
  tier: Tier;
};

export type Player = RankedUser & Profile;

export type Ranking = {
  tier: Tier;
  requiredScore: number;
};

export type Tier =
  | "bronze-3"
  | "bronze-2"
  | "bronze-1"
  | "silver-3"
  | "silver-2"
  | "silver-1"
  | "gold-3"
  | "gold-2"
  | "gold-1"
  | "platinum-3"
  | "platinum-2"
  | "platinum-1"
  | "master"
  | "challenger";

export type APIOptions = {
  limit?: number;
  offset?: number;
};

export type APIError = {
  error: boolean;
  status: number;
  message: string;
};

export type GuildSeason = {
  season: number;
  startTime: string;
  endTime: string;
  rewards: Reward[];
  bonus: Bonus[];
};

type Bonus = {
  guildPointsFrom: number;
  counter: number;
  reward: {
    id: Currency;
    amount: number;
    maxAmount: number;
  };
};

type Currency = "maxs_in";

type Reward = {
  rank: number;
  currency: Currency;
  amount: number;
};

export type Profile = {
  clientID: ClientID;
  guild?: Guild;
  stickers: Sticker[];
  achievements: Achievement[];
  name: string;
  favouriteAxie: number;
  banner: Banner;
  usingReferral: null;
  ownedReferral: null;
  selectedAchievement: string;
  lastChangedUsingReferral: null;
};

export type ProfileRank = {
  clientID: ClientID;
  rank: number;
  score: number;
  tier: Tier;
};

export type ProfilesResponse = {
  items: Profile[];
};

type Banner =
  | "dawn"
  | "dusk"
  | "mech"
  | "plant"
  | "bug"
  | "reptile"
  | "beast"
  | "bird"
  | "aquatic";

type Achievement = {
  id: string;
  category: string;
  rank: number;
};

type Sticker = {
  id: number;
  clientId: ClientID;
  name: string;
  condition: Condition;
  isActive: boolean;
};

type Condition = "crit" | "be-crited" | "shieldwall" | "cannon" | "victory";

export type BattleStatus = "victory" | "defeat" | "draw";

export type AxieClass =
  | "Beast"
  | "Bug"
  | "Bird"
  | "Plant"
  | "Reptile"
  | "Aquatic"
  | "Dawn"
  | "Dusk"
  | "Mech";

type AxiePartType = "Eyes" | "Mouth" | "Ears" | "Horn" | "Back" | "Tail";

export type AxiePart = {
  type: AxiePartType;
  class: AxieClass;
  id: string;
};

export type Stat = "hp" | "morale" | "skill" | "speed";

export type AxieStats = {
  [key in Stat]: number;
};

export type Axie = {
  parts: AxiePart[];
  class: AxieClass;
  stats: AxieStats;
};

export type AxieDetailsResponse = {
  data: {
    axie: Axie;
  };
};

export type Guild = {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  description: string;
  ownerID: string;
  countryCode: string;
  xps: number;
  memberCounts: number;
  memberLimits: number;
  level: number;
  passwordRequired: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GuilUsersResponse = {
  items: GuildUser[];
};

export type GuildUserRole = "member" | "intern" | "commander" | "owner";

export type GuildUser = {
  clientID: string;
  role: GuildUserRole;
  contributionPoints: number;
  guildPoints: number;
  joinedAt: string;
};

export type GuildsLeaderboardResponse = {
  items: RankedGuild[];
  pagination: Pagination;
};

type Pagination = {
  hasNext: boolean;
  limit: number;
  offset: number;
};

export type RankedGuild = {
  id: string;
  name: string;
  rank: number;
  totalGuildPoints: number;
  countryCode: string;
  avatar: string;
};
