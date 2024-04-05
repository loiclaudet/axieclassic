import type { Leaderboard } from "~/app/lib/definitions";
import Player from "~/app/ui/player";

async function getLeaderboard() {
  const response = await fetch(
    `https://axie-classic.skymavis.com/v1/leaderboards?offset=0&limit=10`,
  );

  const data = (await response.json()) as Leaderboard;
  return data;
}

export default async function ArenaPage() {
  const leaderboard = await getLeaderboard();

  return (
    <main>
      arena!
      <hr />
      <div className="flex flex-col">
        {leaderboard._items.map((player) => (
          <Player key={player.clientID} player={player} />
        ))}
      </div>
    </main>
  );
}
