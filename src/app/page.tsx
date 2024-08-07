import Player from "~/components/player";
import { getPlayers } from "~/data";
import { Search } from "~/components/search";
import { Season } from "~/components/season";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import { Header } from "~/app/header";
import { TbSwords as SwordsIcon } from "react-icons/tb";

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
      ></Header>
      <main className="col-start-2 flex flex-col items-center gap-4 px-2 py-4 lg:px-0">
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
    </>
  );
}
