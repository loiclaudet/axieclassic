import Player from "~/app/ui/player";
import { getPlayers } from "~/app/data";
import { Search } from "~/app/ui/search";
import { Season } from "~/app/ui/season";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

export const revalidate = 180; // 3 minutes

export default async function ArenaPage() {
  const players = await getPlayers();
  const isError = "error" in players;

  return (
    <main className="col-start-2 flex flex-col items-center gap-4 px-2 py-4 lg:px-0">
      <header className="z-10 flex w-full flex-col items-center justify-between gap-4 bg-gray-950 px-2 sm:sticky sm:top-0 sm:flex-row sm:gap-1 sm:py-2">
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
      </header>
      {isError ? (
        <div className="flex h-96 items-center justify-center">
          <p className="text-lg text-gray-300">{players.message}</p>
        </div>
      ) : (
        <ul className="flex flex-col overflow-hidden rounded-xl border border-gray-600">
          {players.map((player, index) => (
            <li
              className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-950"}`}
              key={player.clientID}
            >
              <Player player={player} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
