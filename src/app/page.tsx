import Player from "~/app/ui/player";
import { getLeaderboard } from "~/app/lib/data";
import { Search } from "~/app/ui/search";

// export const revalidate = 300; // 5 minutes

export default async function ArenaPage() {
  const leaderboard = await getLeaderboard();

  return (
    <main className="col-start-2 flex flex-col items-center gap-4 px-2 py-4 lg:px-0">
      <Search />
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
