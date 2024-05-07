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

type ClientID = string;

export type Leaderboard = {
  _etag: string;
  _items: Player[];
  _range: {
    limit: number;
    offset: number;
    hasNext: boolean;
  };
  _links: {
    next: string;
  };
};

export type Player = {
  clientID: ClientID;
  name: string;
  elo: number;
  rank: number;
};

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
