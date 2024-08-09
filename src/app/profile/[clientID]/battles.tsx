import Link from "next/link";
import { LuClock as ClockIcon } from "react-icons/lu";
import { LuExternalLink as ExternalLinkIcon } from "react-icons/lu";
import type { Battle, BattleWithProfiles } from "~/lib/definitions";
import { BATTLE_LIMIT } from "~/lib/constant";
import { getProfileBattles } from "~/data";
import { Fighters } from "~/components/fighters";
import { Badge } from "~/components/badge";
import { BattleStatus } from "~/components/battle-status";
import { Button } from "~/components/ui/button";
import { DashedLine } from "~/components/ui/dashed-line";

type BattlesProps = {
  clientID: string;
};

export const Battles = async ({ clientID }: BattlesProps) => {
  const battles = await getProfileBattles(clientID, { limit: BATTLE_LIMIT });

  if ("error" in battles) {
    return <p className="flex-grow text-center">{battles.message}</p>;
  }

  if (battles.length === 0) {
    return (
      <div>
        <p className="flex-grow text-center">No battles found for user</p>
        <p className="flex-grow text-center font-bold">{clientID}</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4 overflow-hidden">
      {battles.map((battle) => {
        return (
          <li key={battle.uuid} className="bg-neutral-aside-dark">
            <Battle battle={battle} />
          </li>
        );
      })}
    </ul>
  );
};

type BattleProps = {
  battle: BattleWithProfiles;
};

async function Battle({ battle }: BattleProps) {
  const {
    clientID,
    createdAt,
    pvpType,
    team,
    uuid,
    winner,
    clientProfile,
    opponentProfile,
  } = battle;
  const isDraw = winner === "draw";
  const isVictory = winner === clientID;
  const playerFighterIDs = team.find((t) => t.owner === clientID)!.fighterIDs;
  const opponentTeam = team.find((t) => t.owner !== clientID)!;
  const { owner: opponentID, fighterIDs: opponentFighterIDs } = opponentTeam;
  const durationFromNow = calculateDurationFromNow(createdAt);

  return (
    <div className="flex border-y border-b border-y-neutral-separator-dark p-2">
      <div className="flex flex-col items-start">
        <p className="pl-2 text-sm">{clientProfile.name}</p>
        <Fighters lookRight fighterIDs={playerFighterIDs} />
        <DashedLine />
        <Link
          className="group flex items-center gap-1 p-2 pb-0 transition-colors hover:text-neutral-100 hover:underline"
          prefetch={false}
          href={`/profile/${opponentID}`}
        >
          <p className="text-sm">{opponentProfile.name}</p>
          <ExternalLinkIcon className="h-3 w-3 text-neutral-100 transition-all group-hover:scale-125" />
        </Link>
        <Fighters fighterIDs={opponentFighterIDs} />
      </div>
      <DashedLine direction="vertical" />

      <div className="flex flex-col items-center justify-center gap-4 p-2">
        <BattleStatus
          status={isDraw ? "draw" : isVictory ? "victory" : "defeat"}
        />
        <div className="flex flex-col items-center gap-2">
          <Duration durationFromNow={durationFromNow} />
          <Badge pvpType={pvpType} />
        </div>
        <Button asChild size="sm">
          <a
            href={`https://cdn.axieinfinity.com/game/deeplink.html?f=rpl&q=${uuid}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            replay
          </a>
        </Button>
      </div>
    </div>
  );
}

const Duration = ({ durationFromNow }: { durationFromNow: number }) => (
  <div className="flex items-center gap-1 text-xs">
    <ClockIcon width={12} height={12} />
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

const calculateDurationFromNow = (date: string) =>
  new Date().getTime() - new Date(date).getTime();
