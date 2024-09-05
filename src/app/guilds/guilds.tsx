import Link from "next/link";
import Image from "next/image";
import { getGuildsLeaderboard } from "~/data/guild";
import type { GuildSeason, RankedGuild } from "~/lib/definitions";
import emojiFlags from "emoji-flags";
import { TbHexagonLetterG as GuildPointIcon } from "react-icons/tb";
import { SocialIcons } from "~/components/social-icons";
import { guildSocialsByGuildID } from "~/lib/socials";
import { getGuildSeason } from "~/data";
import { Suspense } from "react";
import { GuildRewardSkeleton } from "~/components/skeletons";

export const Guilds = async () => {
  const guilds = await getGuildsLeaderboard();

  if ("error" in guilds) {
    return (
      <div className="flex h-96 items-center justify-center md:min-w-[768px]">
        <p className="text-lg text-neutral-100">{guilds.message}</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col md:min-w-[768px] md:border-r md:border-r-neutral-separator-dark">
      {guilds.map((guild) => (
        <li
          key={guild.id}
          className="relative border-b border-b-neutral-separator-dark bg-neutral-aside-dark"
        >
          <Guild guild={guild} />
        </li>
      ))}
    </ul>
  );
};

const Guild = ({ guild }: { guild: RankedGuild }) => {
  const { name, avatar, rank, totalGuildPoints, countryCode, id } = guild;
  const country = emojiFlags.countryCode(countryCode);
  const socials = guildSocialsByGuildID.get(id);
  return (
    <div className="relative flex">
      <div className="flex w-16 shrink-0 flex-col md:w-40 md:flex-row">
        <div className="flex basis-1/2 items-center justify-center border-b border-dashed border-neutral-separator-dark md:border-b-0 md:border-r">
          <div className="flex items-baseline text-neutral-100">
            <span className="text-xs md:text-sm">#</span>
            <span className="text-lg font-bold md:text-2xl">{rank}</span>
          </div>
        </div>
        <div className="flex basis-1/2 items-center justify-center">
          <div className="flex items-center justify-center gap-1 text-neutral-100 md:flex-col md:gap-0">
            <GuildPointIcon className="h-3 w-3 md:h-4 md:w-4" />
            <span className="text-xs md:text-base">
              {Intl.NumberFormat().format(totalGuildPoints)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col border-l border-dashed border-neutral-separator-dark md:flex-row">
        <div className="flex flex-1 items-center gap-4 px-4 py-2">
          <Link prefetch={false} href={`/guilds/${id}`}>
            <div className="h-14 w-14 transition-transform hover:scale-105 md:h-[75px] md:w-[75px] ">
              <Image
                src={
                  avatar.startsWith("custom")
                    ? `https://cdn.skymavis.com/mavisx/dlc-central/remote-config/classic-m/custom-guild-avatar/${id}.png`
                    : avatar === "default"
                      ? `/guild-avatars/avatar_20.png`
                      : `/guild-avatars/${avatar}.png`
                }
                width={75}
                height={75}
                alt={name}
              />
            </div>
          </Link>
          <div className="flex flex-1 flex-col gap-1 md:gap-2">
            <Link prefetch={false} href={`/guilds/${id}`}>
              <h2 className="text-base leading-5 text-neutral-100 hover:underline md:line-clamp-2 md:text-xl">
                {name}
              </h2>
            </Link>
            <div className="flex gap-2">
              <span title={country.name} className="cursor-default text-xl">
                {country.emoji}
              </span>
              {socials && (
                <SocialIcons
                  iconClassName="h-[26px] w-[26px] rounded-lg px-.5 py-px"
                  listClassName="md:mb-3"
                  socials={socials}
                />
              )}
            </div>
          </div>
          <Suspense fallback={<GuildRewardSkeleton />}>
            <GuildReward guildPoints={totalGuildPoints} rank={rank} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

const GuildReward = async ({
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
  const axsReward = axsRankReward + axsBonusReward;

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
