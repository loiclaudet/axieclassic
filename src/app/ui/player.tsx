import type { Player } from "~/app/lib/definitions";
import { Suspense } from "react";
import Link from "next/link";
import { TeamSkeleton } from "~/app/ui/skeletons";
import { getBattles } from "~/app/lib/data";
import { Fighters } from "./fighters";
// clientID exemple: 0xbfdc8693192d5b445e30a840a040ec8d87bc2ade

type PlayerProps = {
  player: Player;
};

export default function Player({ player }: PlayerProps) {
  const { name, elo, rank, clientID } = player;
  return (
    <div className="flex">
      <div className="flex flex-col gap-2 p-4">
        <Link href={`/profile/${clientID}`}>
          <h2 className="line-clamp-2 w-72 text-lg leading-6 text-[#EDEDED] hover:underline">
            {name}
          </h2>
        </Link>
        <div className="flex gap-4">
          <span>#{rank}</span>
          <span>🏆 {elo}</span>
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
  const lastBattle = battles?.items?.[0];

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
