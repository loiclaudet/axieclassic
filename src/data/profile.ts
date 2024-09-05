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

export async function getProfile(
  clientID: string,
): Promise<Profile | APIError> {
  try {
    const response = await fetch(
      `https://axie-classic.skymavis.com/v1/players/profile?clientIDs=${clientID}`,
    );

    const data = (await response.json()) as ProfilesResponse;
    if (data?.items?.length) {
      return data.items[0]!;
    }
    throw new Error("Profile not found.");
  } catch (error) {
    console.error(error);
    return {
      error: true,
      status: 500,
      message: "Error fetching profile.",
    };
  }
}

export async function getProfileRank(
  clientID: ClientID,
): Promise<ProfileRank | APIError> {
  const endpoint = `https://classic.axieinfinity.com/api/playerRanking/${clientID}`;
  const response = await fetch(endpoint);
  const data = (await response.json()) as ProfileRank;
  return data;
}
