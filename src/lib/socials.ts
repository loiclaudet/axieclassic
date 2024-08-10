import { ClientID } from "~/lib/definitions";

export type Social = "twitch" | "x" | "youtube" | "facebook";
type SocialURL =
  | "https://www.twitch.tv/"
  | "https://x.com/"
  | "https://www.youtube.com/"
  | "https://www.facebook.com/";

export type ClientSocials = {
  [key in Social]?: string;
};

export const clientSocialsByClientID = new Map<ClientID, ClientSocials>([
  [
    "0x2c6be461ad32f18456b794394d64030ee5eee5bd",
    {
      twitch: "saveaxieclassic",
      x: "hernan947",
      youtube: "@saveaxieclassic",
    },
  ],
  [
    "0xb7db839a370ed01f174a6e33317ef65f583841b6",
    {
      x: "ThunderRoyale",
    },
  ],
  // [
  //   "",
  //   {
  //     x: "chan103199",
  //   },
  // ],
  [
    "0x1261b9ad128e9e74c4d224a870099c85b956b3bb",
    {
      x: "Mitchybishi",
    },
  ],
  // [
  //   "0x7775524c9ab7543915bb5ce2310fe25787d82de5",
  //   {
  //     x: "Mythrasaur",
  //   },
  // ],
  [
    "0x9a967b58f228a375f00c2112741ded7c85e31fdb",
    {
      x: "acemelercato",
    },
  ],
  [
    "0x9d6eca642c9afe89b38c62db043e66d4fccbd780",
    {
      x: "ifelicianoh",
    },
  ],
]);

export const socialURLBySocial = new Map<Social, SocialURL>([
  ["twitch", "https://www.twitch.tv/"],
  ["x", "https://x.com/"],
  ["youtube", "https://www.youtube.com/"],
  ["facebook", "https://www.facebook.com/"],
]);
