import { Suspense } from "react";
import { TbSwords as SwordsIcon } from "react-icons/tb";
import { TbArrowBigUpLineFilled as ArrowUpIcon } from "react-icons/tb";
import { getPlayers } from "~/data";
import { SEASON_CHAMPIONSHIP_QUALIFIED } from "~/lib/constant";
import { Header } from "~/app/header";
import Player from "~/components/player";
import { Search } from "~/components/search";
import { Season } from "~/components/season";
import { SeasonSkeleton } from "~/components/skeletons";
import Link from "next/link";
import Image from "next/image";

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
      <main className="flex flex-col items-start lg:w-[987px]">
        <div className="flex w-full flex-col border-r border-r-neutral-separator-dark sm:w-auto">
          <div className="flex flex-col gap-4 px-4 py-4 md:sticky md:top-0 md:z-10 md:flex-row md:gap-12 md:border-b md:border-b-neutral-separator-dark md:bg-neutral-bg-dark/70 md:backdrop-blur-md">
            <Suspense fallback={<SeasonSkeleton />}>
              <Season />
            </Suspense>
            <Search />
          </div>
          {isError ? (
            <div className="flex h-[calc(100dvh-68px)] w-full flex-col items-center gap-2 lg:w-[768px]">
              <p className="mt-6 max-w-[300px] text-balance text-center text-lg text-neutral-100 sm:max-w-full">
                {players.message}
              </p>
              <Image
                src="/olek-fails.png"
                width={200}
                height={200}
                alt="error retrieving arena leaderboard"
              />
              <p className="max-w-[300px] text-balance text-center text-lg text-neutral-100 sm:max-w-full">
                Check out the teams from{" "}
                <Link href="/guilds" prefetch={false} className="underline">
                  Top Guilds
                </Link>
                .
              </p>
            </div>
          ) : (
            <ul className="flex flex-col">
              {players.map((player, index) => {
                return (
                  <>
                    <li
                      className="relative border-b border-b-neutral-separator-dark bg-neutral-aside-dark"
                      key={player.clientID}
                    >
                      <Player player={player} imagePriority={index <= 5} />
                    </li>
                    {index + 1 === SEASON_CHAMPIONSHIP_QUALIFIED && (
                      <li
                        key="season-championship-qualified"
                        className="flex items-center justify-center gap-3 py-2"
                      >
                        <ArrowUpIcon className="h-5 w-5 text-seafoam-green-500" />
                        <div className="group cursor-default rounded-full px-1.5 py-0.5 text-sm font-medium text-seafoam-green-500">
                          <div className="flex items-center justify-center gap-1">
                            <span>Season Championship qualified</span>
                          </div>
                        </div>
                        <ArrowUpIcon className="h-5 w-5 text-seafoam-green-500" />
                      </li>
                    )}
                  </>
                );
              })}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
