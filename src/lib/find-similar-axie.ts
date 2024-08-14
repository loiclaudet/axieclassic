import type { Axie, AxiePart, AxieStats, Stat } from "./definitions";

export const createFindSimilarAxieUrl = (
  axie: Axie,
  preservedStats?: Stat[],
): string => {
  const baseURL = "https://app.axieinfinity.com/marketplace/axies/";

  return `${baseURL}?auctionTypes=Sale&sort=PriceAsc&classes=${axie.class}&${partsQueryBuilder(axie.parts)}&${preservedStats ? statsQueryBuilder(axie.stats, preservedStats) : ""}`;
};

const statsQueryBuilder = (
  axieStats: AxieStats,
  preservedStats: Stat[],
): string =>
  preservedStats
    .map((stat) => `${stat}=${axieStats[stat]}&${stat}=${axieStats[stat]}`)
    .join("&");

const partsQueryBuilder = (parts: AxiePart[]): string => {
  const filterParts = ["Eyes", "Ears"];

  return parts
    .filter((part) => !filterParts.includes(part.type))
    .map((part) => {
      for (const group of groupedPartIds) {
        if (group.includes(part.id)) {
          return group.map(partsQueryParamsByPartId).join("&");
        }
      }

      return partsQueryParamsByPartId(part.id);
    })
    .join("&");
};

const partsQueryParamsByPartId = (part: string) =>
  `parts=${part}&parts=${part.endsWith("2") ? part.slice(0, -2) : `${part}-2`}`;

const groupedPartIds = [
  [
    "tail-cottontail",
    "tail-cotton-candy",
    "tail-cotton-candy-shiny",
    "tail-sakura-cottontail",
  ],
  [
    "horn-unko",
    "horn-strawberry-ice-cream",
    "horn-vanilla-ice-cream",
    "horn-watermelon-ice-cream",
    "horn-strawberry-ice-cream-shiny",
    "horn-vanilla-ice-cream-shiny",
    "horn-watermelon-ice-cream-shiny",
    "horn-pinku-unko",
  ],
  ["mouth-risky-fish", "mouth-bubble-fish", "mouth-bubble-fish-shiny"],
  ["back-red-ear", "back-turtle-buoy", "back-turtle-buoy-shiny"],
  ["back-indian-star", "back-frozen-bucket", "back-1nd14n-5t4r"],
  ["tail-tiny-dino", "tail-fir-trunk"],
  ["back-risky-beast", "back-hamaya"],
  ["back-yakitori", "back-shiitake"],
  ["tail-koi", "tail-koinobori"],
  ["tail-omatsuri", "tail-granmas-fan"],
  ["horn-umaibo", "horn-little-branch"],
  ["back-origami", "back-cupid"],
];
