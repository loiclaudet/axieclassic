import { Suspense } from "react";
import { TbSwords as SwordsIcon } from "react-icons/tb";
import { TbArrowBigUpLineFilled as ArrowUpIcon } from "react-icons/tb";
import { LuExternalLink as ExternalLinkIcon } from "react-icons/lu";
import { getPlayers } from "~/data";
import { SEASON_CHAMPIONSHIP_QUALIFIED } from "~/lib/constant";
import { Header } from "~/app/header";
import Player from "~/components/player";
import { Search } from "~/components/search";
import { Season } from "~/components/season";
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
        <div className="flex flex-col gap-4 px-4 py-4 md:sticky md:top-0 md:z-10 md:flex-row md:gap-12 md:border-b md:border-b-neutral-separator-dark md:bg-neutral-bg-dark/70 md:backdrop-blur-md">
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
            {players.map((player, index) => {
              return (
                <>
                  <li
                    className="relative border-b border-b-neutral-separator-dark bg-neutral-aside-dark"
                    key={player.clientID}
                  >
                    <Player player={player} />
                  </li>
                  {index + 1 === SEASON_CHAMPIONSHIP_QUALIFIED && (
                    <li
                      key="season-championship-qualified"
                      className="flex items-center justify-center gap-3 py-2"
                    >
                      <ArrowUpIcon className="h-5 w-5 text-seafoam-green-500" />
                      <div className="group cursor-pointer rounded-full px-1.5 py-0.5 text-sm font-medium text-seafoam-green-500">
                        <a
                          href="https://blog.axieinfinity.com/i/146870946/s-season-championship"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1"
                        >
                          <span className="group-hover:underline">
                            Season Championship qualified
                          </span>
                          <ExternalLinkIcon className="h-4 w-4 transition-all group-hover:scale-110" />
                        </a>
                      </div>
                      <ArrowUpIcon className="h-5 w-5 text-seafoam-green-500" />
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}
