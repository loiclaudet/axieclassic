import { Suspense } from "react";
import { Battles } from "~/app/profile/[clientID]/battles";
import { Search } from "~/app/ui/search";
import { BattlesSkeleton } from "~/app/ui/skeletons";

export default function Page({ params }: { params: { clientID: string } }) {
  const { clientID } = params;
  return (
    <main className="flex flex-col items-center gap-4 py-4">
      <Search />
      <Suspense fallback={<BattlesSkeleton />}>
        <Battles clientID={clientID} />
      </Suspense>
    </main>
  );
}
