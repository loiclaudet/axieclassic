import { SeasonSkeleton } from "~/components/skeletons";
import { Header } from "~/app/header";
import { GiSwordsEmblem as GuildIcon } from "react-icons/gi";

export default function Loading() {
  return (
    <>
      <Header
        heading={
          <div className="flex items-center gap-2 text-neutral-100">
            <GuildIcon className="h-6 w-6" />
            <span className="text-2xl font-bold">Guilds</span>
          </div>
        }
      />
      <main className="flex flex-col md:items-start lg:w-[987px]">
        <div className="flex justify-center border-r border-r-neutral-separator-dark bg-neutral-bg-dark/70 px-4 py-4 backdrop-blur-md md:sticky md:top-0 md:z-10 md:min-w-[768px] md:border-b md:border-b-neutral-separator-dark">
          <SeasonSkeleton />
        </div>

        <div className="flex h-dvh items-center justify-center md:min-w-[768px]">
          Loading...
        </div>
      </main>
    </>
  );
}
