import Image from "next/image";
import { env } from "~/env";
import type { Battles, Leaderboard } from "~/app/lib/definitions";
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

async function getLeaderboard() {
  const response = await fetch(
    `https://axie-classic.skymavis.com/v1/leaderboards?offset=0&limit=5`,
  );

  const data = (await response.json()) as Leaderboard;
  return data;
}

export default async function ArenaPage() {
  const leaderboard = await getLeaderboard();
  const top1ClientID = leaderboard._items[0]!.clientID;
  const top1Battles = await getBattles(top1ClientID);
  const top1LastBattle = top1Battles.items[0]!;
  const top1Fighters = top1LastBattle.team.find(
    (team) => team.owner === top1ClientID,
  )!.fighterIDs;

  return (
    <main>
      arena!
      <pre>{JSON.stringify(leaderboard._items, null, 2)}</pre>
      <hr />
      <div className="flex">
        {top1Fighters.map((fighterID) => (
          <Image
            key={fighterID}
            width={200}
            height={200}
            objectFit="contain"
            alt={`Axie #${fighterID}`}
            src={`https://axiecdn.axieinfinity.com/axies/${fighterID}/axie/axie-full-transparent.png`}
          />
        ))}
      </div>
    </main>
  );
}
