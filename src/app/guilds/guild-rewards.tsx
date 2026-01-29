import Image from "next/image";
import { getGuildSeason } from "~/data";
import type { GuildSeason } from "~/lib/definitions";

export const GuildReward = async ({
  guildPoints,
  rank,
}: {
  guildPoints: number;
  rank: number;
}) => {
  const guildSeason = await getGuildSeason();
  if ("error" in guildSeason) {
    return <div>{guildSeason.message}</div>;
  }
  const axsRankReward = getGuildAXSRankReward(rank, guildSeason);
  const axsBonusReward = getGuildAXSBonusReward(guildPoints, guildSeason);
  const axsReward = Math.round((axsRankReward + axsBonusReward) / 10) * 10;

  if (axsReward === 0) return null;

  return (
    <div className="flex flex-col items-center justify-end md:flex-row md:gap-1">
      <span className="text-base font-normal md:text-xl md:font-medium">
        {Intl.NumberFormat().format(axsReward)}
      </span>
      <Image
        className="-order-1 h-4 w-4 md:h-6 md:w-6"
        src="/axs.png"
        width={24}
        height={24}
        alt="AXS"
      />
    </div>
  );
};

const getGuildAXSRankReward = (
  rank: number,
  guildSeason: GuildSeason,
): number => {
  const { rewards: guildRewards } = guildSeason;
  const reward = guildRewards.find((r) => r.rank === rank);
  return axsByMaxs(reward?.amount ?? 0);
};

const getGuildAXSBonusReward = (
  guildPoints: number,
  guildSeason: GuildSeason,
): number => {
  const { bonus: guildBonuses } = guildSeason;
  const bonus = guildBonuses
    .filter((b) => b.reward.id === "maxs_in")
    .sort((a, b) => b.guildPointsFrom - a.guildPointsFrom)
    .find((b) => guildPoints >= b.guildPointsFrom);
  return axsByMaxs(bonus?.reward.amount ?? 0);
};

const axsByMaxs = (maxsIn: number) => maxsIn * 0.001;
