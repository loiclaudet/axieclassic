import { Suspense } from "react";
import { Guilds } from "./guilds";
import { SeasonSkeleton } from "~/components/skeletons";
import { Season } from "~/components/season";

export default function GuildsPage() {
  return (
    <main className="flex flex-col md:items-start lg:w-[987px]">
      <div className="sticky top-0 z-10 flex justify-center border-r border-r-neutral-separator-dark bg-neutral-bg-dark/70 px-4 py-4 backdrop-blur-md md:min-w-[768px]">
        <Suspense fallback={<SeasonSkeleton />}>
          <Season />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Guilds />
      </Suspense>
    </main>
  );
}
