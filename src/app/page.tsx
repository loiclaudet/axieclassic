import Player from "~/components/player";
import { getPlayers } from "~/data";
import { Search } from "~/components/search";
import { Season } from "~/components/season";
import { Suspense } from "react";
import { Header } from "~/app/header";
import { TbSwords as SwordsIcon } from "react-icons/tb";
import { SeasonSkeleton } from "~/components/skeletons";

export const revalidate = 180; // 3 minutes

export default async function ArenaPage() {
  const players = await getPlayers();
  const isError = "error" in players;

  return (
    <>
      <Header
        heading={
          <div className="flex items-center gap-2 text-neutral-100">
            <SwordsIcon className="h-6 w-6" />
            <span className="text-2xl font-bold">Arena</span>
          </div>
        }
      />
      <main className="flex flex-1 flex-col">
        <div className="flex flex-col gap-4 px-4 py-4 sm:sticky sm:top-0 sm:z-10 sm:flex-row sm:gap-12 sm:border-b sm:border-b-neutral-separator-dark sm:bg-neutral-bg-dark/70 sm:backdrop-blur-md">
          <Suspense fallback={<SeasonSkeleton />}>
            <Season />
          </Suspense>
          <Search />
        </div>
        {isError ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-lg text-neutral-100">{players.message}</p>
          </div>
        ) : (
          <ul className="flex w-full flex-col overflow-hidden">
            {players.map((player) => (
              <li className="bg-neutral-aside-dark" key={player.clientID}>
                <Player player={player} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
