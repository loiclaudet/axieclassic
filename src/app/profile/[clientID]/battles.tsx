import Link from "next/link";
import Image from "next/image";
import type { Battle } from "~/app/lib/definitions";
import { getBattles } from "~/app/data";
import { Fighters } from "~/app/ui/fighters";
import { BATTLE_LIMIT } from "~/app/lib/constant";
import { Badge } from "~/app/ui/badge";
import { BattleStatus } from "~/app/ui/battle-status";
import { LuClock as ClockIcon } from "react-icons/lu";
import { Button } from "~/components/ui/button";

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
  const isVictory = winner === clientID;
  const playerFighterIDs = team.find((t) => t.owner === clientID)!.fighterIDs;
  const opponentTeam = team.find((t) => t.owner !== clientID)!;
  const { owner: opponentID, fighterIDs: opponentFighterIDs } = opponentTeam;
  const durationFromNow = calculateDurationFromNow(createdAt);

  return (
    <div className="flex flex-col items-center p-2 sm:flex-row">
      <Fighters lookRight fighterIDs={playerFighterIDs} />
      <div className="flex flex-row items-center gap-5 sm:w-28 sm:flex-col sm:gap-2">
        <Badge pvpType={pvpType} />
        <BattleStatus
          status={isDraw ? "draw" : isVictory ? "victory" : "defeat"}
        />
        <div className="flex flex-row items-center gap-3 sm:flex-col sm:gap-0">
          <Duration durationFromNow={durationFromNow} />
          <Button asChild>
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
