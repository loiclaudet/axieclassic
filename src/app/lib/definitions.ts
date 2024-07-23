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

export type Season = {
  season: number;
  startTime: string;
  endTime: string;
};

export type Profile = {
  clientID: ClientID;
  guild: Guild;
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

export type ProfilesResponse = {
  items: Profile[];
};

type Guild = {
  id: string;
  name: string;
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
