import Player from "~/app/ui/player";
import { getLeaderboard } from "~/app/lib/data";

export default async function ArenaPage() {
  const leaderboard = await getLeaderboard();

  return (
    <main className="col-start-2">
      <ul className="flex flex-col overflow-hidden rounded-xl border border-gray-600">
        {leaderboard._items.map((player, index) => (
          <li
            className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-950"}`}
            key={player.clientID}
          >
            <Player player={player} />
          </li>
        ))}
      </ul>
    </main>
  );
}
