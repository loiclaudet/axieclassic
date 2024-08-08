import { ClientID } from "~/lib/definitions";

export type Social = "twitch" | "x" | "youtube" | "facebook";
type SocialURL =
  | "https://www.twitch.tv"
  | "https://x.com"
  | "https://www.youtube.com"
  | "https://www.facebook.com";

type ClientSocials = {
  [key in Social]?: string;
};

export const clientSocialsByClientID = new Map<ClientID, ClientSocials>([
  [
    "0x2c6be461ad32f18456b794394d64030ee5eee5bd",
    {
      twitch: "saveaxieclassic", //https://www.twitch.tv/
      x: "hernan947", // https://x.com/
      youtube: "@saveaxieclassic", // https://www.youtube.com/
    },
  ],
]);

export const socialURLBySocial = new Map<Social, SocialURL>([
  ["twitch", "https://www.twitch.tv"],
  ["x", "https://x.com"],
  ["youtube", "https://www.youtube.com"],
  ["facebook", "https://www.facebook.com"],
]);
