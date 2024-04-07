import Image from "next/image";
import type { Player } from "~/app/lib/definitions";
import { Suspense } from "react";
import Link from "next/link";
import { TeamSkeleton } from "~/app/ui/skeletons";
import { getBattles } from "~/app/lib/data";
// clientID exemple: 0xbfdc8693192d5b445e30a840a040ec8d87bc2ade

type PlayerProps = {
  player: Player;
};

export default function Player({ player }: PlayerProps) {
  const { name, elo, rank, clientID } = player;
  return (
    <div className="flex">
      <div className="flex flex-col">
        <Link href={`/profile/${clientID}`}>
          <h2>{name}</h2>
        </Link>
        <p>elo: {elo}</p>
        <p>rank: {rank}</p>
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

  return (
    <div className="flex">
      {lastBattleFighterIDs.map((fighterID) => (
        <Image
          key={fighterID}
          width={150}
          height={100}
          className="object-contain"
          alt={`Axie #${fighterID}`}
          src={`https://axiecdn.axieinfinity.com/axies/${fighterID}/axie/axie-full-transparent.png`}
        />
      ))}
    </div>
  );
}
