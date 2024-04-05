import Image from "next/image";

import { env } from "~/env";
import type { Battles, Player } from "~/app/lib/definitions";
import { Suspense } from "react";
// clientID exemple: 0xbfdc8693192d5b445e30a840a040ec8d87bc2ade

async function getBattles(clientId: string) {
  const response = await fetch(
    `https://api-gateway.skymavis.com/classic/v1/community/users/${clientId}/battle-histories?limit=4&offset=0`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": env.X_API_KEY,
      },
    },
  );
  const data = (await response.json()) as Battles;
  return data;
}

type PlayerProps = {
  player: Player;
};

export default function Player({ player }: PlayerProps) {
  const { name, elo, rank, clientID } = player;
  return (
    <div className="flex">
      <div className="flex flex-col">
        <h1>{name}</h1>
        <p>elo: {elo}</p>
        <p>rank: {rank}</p>
      </div>
      <Team clientID={clientID} />
    </div>
  );
}

type TeamProps = {
  clientID: string;
};

async function Team({ clientID }: TeamProps) {
  const battles = await getBattles(clientID);
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

  return (
    <Suspense fallback={<p>loading team...</p>}>
      <div className="flex">
        {lastBattleFighterIDs.map((fighterID) => (
          <Image
            key={fighterID}
            width={100}
            height={100}
            objectFit="contain"
            alt={`Axie #${fighterID}`}
            src={`https://axiecdn.axieinfinity.com/axies/${fighterID}/axie/axie-full-transparent.png`}
          />
        ))}
      </div>
    </Suspense>
  );
}
