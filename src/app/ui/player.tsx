import type { Player } from "~/app/lib/definitions";
import { Suspense } from "react";
import Link from "next/link";
import { TeamSkeleton } from "~/app/ui/skeletons";
import { getBattles } from "~/app/lib/data";
import { Fighters } from "./fighters";

type PlayerProps = {
  player: Player;
};

export default function Player({ player }: PlayerProps) {
  const { name, elo, rank, clientID } = player;
  return (
    <div className="flex flex-col items-center sm:flex-row">
      <div className="flex flex-col gap-2 p-4">
        <Link prefetch={false} href={`/profile/${clientID}`}>
          <h2 className="line-clamp-2 w-72 text-lg leading-6 text-[#EDEDED] hover:underline">
            {name}
          </h2>
        </Link>
        <div className="flex gap-4">
          <span>#{rank}</span>
          <div className="flex items-center gap-1">
            <span className="text-xs">🏆</span>
            <span>{elo}</span>
          </div>
        </div>
      </div>
      <Suspense fallback={<TeamSkeleton />}>
        <Team clientID={clientID} />
      </Suspense>
    </div>
  );
}

type TeamProps = {
  clientID: string;
};

async function Team({ clientID }: TeamProps) {
  const battles = await getBattles(clientID, { limit: 1 });

  if ("error" in battles) {
    return <p>{battles.message}</p>;
  }

  const lastBattle = battles.items[0];

  if (!lastBattle) {
    return <p>no battles</p>;
  }

  const lastBattleFighterIDs = lastBattle.team.find(
    (team) => team.owner === clientID,
  )?.fighterIDs;

  if (!lastBattleFighterIDs) {
    return <p>no team</p>;
  }

  return <Fighters fighterIDs={lastBattleFighterIDs} />;
}
