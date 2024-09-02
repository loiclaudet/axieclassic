import { MAXIMUM_PLAYERS_API_LIMIT } from "~/lib/constant";
import type {
  ClientID,
  Profile,
  APIError,
  ProfilesResponse,
  ProfileRank,
} from "~/lib/definitions";
import { chunk } from "~/lib/utils";

export async function getProfiles(
  profileClientIDs: ClientID[],
): Promise<Profile[] | APIError> {
  const endpoint = chunk(profileClientIDs, MAXIMUM_PLAYERS_API_LIMIT).flatMap(
    createProfilesEndpoint,
  )[0]!;

  const profiles = await fetchProfiles(endpoint);
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

export async function getProfileRank(
  clientID: ClientID,
): Promise<ProfileRank | APIError> {
  const endpoint = `https://classic.axieinfinity.com/api/playerRanking/${clientID}`;
  const response = await fetch(endpoint);
  const data = (await response.json()) as ProfileRank;
  return data;
}
