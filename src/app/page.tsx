import Player from "~/app/ui/player";
import { getLeaderboard } from "~/app/lib/data";
import { Search } from "~/app/ui/search";
import { Season } from "~/app/ui/season";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

export const revalidate = 180; // 3 minutes

export default async function ArenaPage() {
  const leaderboard = await getLeaderboard();

  return (
    <main className="col-start-2 flex flex-col items-center gap-4 px-2 py-4 lg:px-0">
      <div className="flex w-full flex-col items-center justify-between gap-4 px-2 sm:flex-row sm:gap-1">
        <Suspense
          fallback={
            <Skeleton
              borderRadius={4}
              height={50}
              width={200}
              baseColor="#202020"
              highlightColor="#444"
            />
          }
        >
          <Season />
        </Suspense>
        <Search />
      </div>
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
