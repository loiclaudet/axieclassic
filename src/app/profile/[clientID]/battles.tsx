import Link from "next/link";
import Image from "next/image";
import type { Battle } from "~/app/lib/definitions";
import { getBattles } from "~/app/data";
import { Fighters } from "~/app/ui/fighters";
import { BATTLE_LIMIT } from "~/app/lib/constant";

type BattlesProps = {
  clientID: string;
};

export const Battles = async ({ clientID }: BattlesProps) => {
  const battles = await getBattles(clientID, { limit: BATTLE_LIMIT });

  if ("error" in battles) {
    return <p className="flex-grow text-center">{battles.message}</p>;
  }

  if (battles.items.length === 0) {
    return (
      <div>
        <p className="flex-grow text-center">No battles found for user</p>
        <p className="flex-grow text-center font-bold">{clientID}</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col overflow-hidden rounded-xl border border-gray-600">
      {battles.items.map((battle, index) => (
        <li
          key={battle.uuid}
          className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-950"}`}
        >
          <Battle battle={battle} />
        </li>
      ))}
    </ul>
  );
};

type BattleProps = {
  battle: Battle;
};

async function Battle({ battle }: BattleProps) {
  const { clientID, createdAt, pvpType, team, uuid, winner } = battle;
  const isDraw = winner === "draw";
  const isPlayerWinner = winner === clientID;
  const playerFighterIDs = team.find((t) => t.owner === clientID)!.fighterIDs;
  const opponentTeam = team.find((t) => t.owner !== clientID)!;
  const { owner: opponentID, fighterIDs: opponentFighterIDs } = opponentTeam;
  const durationFromNow = calculateDurationFromNow(createdAt);

  return (
    <div className="flex flex-col items-center p-2 sm:flex-row">
      <Fighters lookRight fighterIDs={playerFighterIDs} />
      <div className="flex flex-row items-center gap-5 sm:w-28 sm:flex-col sm:gap-2">
        <Badge variant={badgeVariantByPvpType(pvpType)} subtle>
          {pvpType}
        </Badge>
        <span
          className="text-lg font-bold"
          style={{
            color: isDraw ? "gray" : isPlayerWinner ? "limegreen" : "red",
          }}
        >
          {isDraw ? "draw" : isPlayerWinner ? "won" : "lost"}
        </span>

        <div className="flex flex-row items-center gap-3 sm:flex-col sm:gap-0">
          <Duration durationFromNow={durationFromNow} />
          <a
            className="flex cursor-pointer gap-1 text-sm text-gray-400 underline hover:text-[#EDEDED]"
            href={`https://cdn.axieinfinity.com/game/deeplink.html?f=rpl&q=${uuid}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            replay
          </a>
        </div>
      </div>
      <Fighters fighterIDs={opponentFighterIDs} />
      <button className="group flex h-6 w-8 items-stretch self-center rounded border border-gray-600">
        <Link
          prefetch={false}
          href={`/profile/${opponentID}`}
          className="flex flex-grow items-center justify-center"
        >
          <Image
            className="duration-400 transition-transform ease-in group-hover:scale-125"
            src={`/user.svg`}
            width={12}
            height={12}
            alt="opponent's profile"
          />
        </Link>
      </button>
    </div>
  );
}

const Duration = ({ durationFromNow }: { durationFromNow: number }) => (
  <div className="flex items-center gap-1 text-xs">
    <Image src={`/clock.svg`} width={12} height={12} alt="clock" />
    {durationFromNow > 1000 * 60 * 60 * 24 ? (
      <span>{Math.floor(durationFromNow / (1000 * 60 * 60 * 24))}d</span>
    ) : durationFromNow > 1000 * 60 * 60 ? (
      <span>{Math.floor(durationFromNow / (1000 * 60 * 60))}h</span>
    ) : (
      <span>{Math.floor(durationFromNow / (1000 * 60))}m</span>
    )}
    <span>ago</span>
  </div>
);

type BadgeProps = {
  variant: BadgeVariant;
  subtle?: boolean;
  children: string;
};

type BadgeVariant = "purple" | "amber" | "orange" | "gray";

const Badge = ({ variant, subtle, children }: BadgeProps) => {
  const badgeClassName = badgeClassNameByVariant(variant, subtle);

  return (
    <div className={`rounded-full px-2 py-[1px] text-sm ${badgeClassName}`}>
      {children}
    </div>
  );
};

const badgeVariantByPvpType = (pvpType: PvpType) => {
  switch (pvpType) {
    case "arena":
      return "amber";
    case "colosseum":
      return "orange";
    case "tournament":
      return "purple";
    case "challenge":
      return "gray";
  }
};

const badgeClassNameByVariant = (variant: BadgeVariant, subtle = false) => {
  switch (variant) {
    case "purple":
      return subtle
        ? "bg-[#291D58] text-[#7057D0]"
        : "bg-[#7057D0] text-[#EDEDED]";
    case "amber":
      return subtle
        ? "bg-[rgba(222,140,41,.25)] text-[#EEA91E]"
        : "bg-[#EEA91E] text-[#EDEDED]";
    case "orange":
      return subtle
        ? "bg-[rgba(202,73,1,.25)] text-[#E16E1C]"
        : "bg-[#E16E1C] text-[#EDEDED]";
    case "gray":
      return subtle
        ? "bg-[rgba(179,204,206,.25)] text-[#DCE2E2]"
        : "bg-[#DCE2E2] text-[#0A0A0A]";
  }
};

const calculateDurationFromNow = (date: string) =>
  new Date().getTime() - new Date(date).getTime();
