import type { ClientID, GuildID } from "~/lib/definitions";

export type Social = "twitch" | "x" | "youtube" | "facebook" | "discord";
type SocialURL =
  | "https://www.twitch.tv/"
  | "https://x.com/"
  | "https://www.youtube.com/"
  | "https://www.facebook.com/"
  | "https://discord.gg/";

export type Socials = {
  [key in Social]?: string;
};

export const guildSocialsByGuildID = new Map<GuildID, Socials>([
  [
    "aQEiobGq", // Wolf Gang
    {
      discord: "b8BK8T4Q5t",
    },
  ],
  [
    "SIVQWj8z", // Kokushibo
    {
      discord: "j9rxWeDyxU",
    },
  ],
  [
    "hbAk12xG", // Crit-Theory Gaming
    {
      discord: "crit-theory",
    },
  ],
  [
    "KWOBSIV7", //Monarchs guild
    {
      discord: "KFEWGQ34Cr",
    },
  ],
]);

export const userSocialsByClientID = new Map<ClientID, Socials>([
  [
    "0x2c6be461ad32f18456b794394d64030ee5eee5bd",
    {
      twitch: "saveaxieclassic",
      x: "hernan947",
      youtube: "@saveaxieclassic",
    },
  ],
  [
    "0x89b091cca4c2d9d05fa2c0a074b34ce5897068f9", // Atelo
    {
      x: "AteloAxie",
    },
  ],
  [
    "0xb7db839a370ed01f174a6e33317ef65f583841b6",
    {
      x: "ThunderRoyale",
    },
  ],
  [
    "0x7775524c9ab7543915bb5ce2310fe25787d82de5", //chan5539.ron
    {
      x: "chan103199",
    },
  ],
  [
    "0x1261b9ad128e9e74c4d224a870099c85b956b3bb",
    {
      x: "Mitchybishi",
    },
  ],
  // [
  //   "",
  //   {
  //     x: "Mythrasaur",
  //   },
  // ],
  [
    "0x69fb7919eb9ea60ded40306ee2e77ee852cb224e",
    {
      x: "sonxgong",
    },
  ],
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
  [
    "0x04c6960000338778482932f146f6abcf0014c219",
    {
      twitch: "lebaker",
      x: "lebakerrOK",
    },
  ],
  [
    "0x8fe05cca11462d51e453bd728100fa6db410e6e9",
    {
      x: "Joco_Ignacio",
    },
  ],
]);

export const socialURLBySocial = new Map<Social, SocialURL>([
  ["twitch", "https://www.twitch.tv/"],
  ["x", "https://x.com/"],
  ["youtube", "https://www.youtube.com/"],
  ["facebook", "https://www.facebook.com/"],
  ["discord", "https://discord.gg/"],
]);
