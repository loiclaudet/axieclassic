import { Suspense } from "react";
import { Battles } from "~/app/profile/[clientID]/battles";
import { BattlesSkeleton } from "~/app/ui/skeletons";

export default function Page({ params }: { params: { clientID: string } }) {
  const { clientID } = params;
  return (
    <main className="py-4">
      <Suspense fallback={<BattlesSkeleton />}>
        <Battles clientID={clientID} />
      </Suspense>
    </main>
  );
}
