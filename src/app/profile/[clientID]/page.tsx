import { Suspense } from "react";
import PostHogClient from "~/app/posthog";
import { Battles } from "~/app/profile/[clientID]/battles";
import { Search } from "~/app/ui/search";
import { BattlesSkeleton } from "~/app/ui/skeletons";

export const revalidate = 180; // 3 minutes

export default async function Page({
  params,
}: {
  params: { clientID: string };
}) {
  const { clientID } = params;
  const posthog = PostHogClient();
  await posthog.shutdown();

  return (
    <main className="flex flex-col items-center gap-4 py-4">
      <Search />
      <Suspense fallback={<BattlesSkeleton />}>
        <Battles clientID={clientID} />
      </Suspense>
    </main>
  );
}
