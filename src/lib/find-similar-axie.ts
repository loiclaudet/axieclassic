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
        if (group.includes(removeLevel2Suffix(part.id))) {
          return group.map(partsQueryParamsByPartId).join("&");
        }
      }

      return partsQueryParamsByPartId(part.id);
    })
    .join("&");
};

const removeLevel2Suffix = (part: string) =>
  part.endsWith("2") ? part.slice(0, -2) : part;

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
  ["horn-rose-bud", "horn-piranhaplant", "horn-piranhaplant-shiny"],
  ["horn-trump", "horn-unholy-terror", "horn-unholy-terror-shiny"],
  ["horn-cerastes", "horn-killah-clamp", "horn-killah-clamp-shiny"],
  ["horn-antenna", "horn-dark-antenna", "horn-dark-antenna-shiny"],
  ["tail-rice", "tail-angry-grain", "tail-angry-grain-shiny"],
  ["tail-the-last-one", "tail-evil-eye", "tail-evil-eye-shiny"],
  ["tail-twin-tail", "tail-earwig", "tail-earwig-shiny"],
  ["tail-nimo", "tail-bloodfin", "tail-bloodfin-shiny"],
  ["mouth-catfish", "mouth-bottom-dweller", "mouth-bottom-dweller-shiny"],
  ["mouth-goda", "mouth-dark-kiss", "mouth-dark-kiss-shiny"],
  ["mouth-peace-maker", "mouth-doombringer", "mouth-doombringer-shiny"],
  ["mouth-pincer", "mouth-poisonous-pincer", "mouth-poisonous-pincer-shiny"],
  ["back-goldfish", "back-tendrils", "back-tendrils-shiny"],
  ["back-bidens", "back-petalworts", "back-petalworts-shiny"],
  ["back-furball", "back-shrunken-skulls", "back-shrunken-skulls-shiny"],
  ["back-green-thorns", "back-nightmare-wings", "back-nightmare-wings-shiny"],
];
