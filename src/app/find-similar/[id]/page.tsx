import { Suspense } from "react";
import { FindSimilarAxieContent } from "~/components/find-similar-axie-content";
import { FindSimilarSkeleton } from "~/components/skeletons";

export default async function FindSimilarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<FindSimilarSkeleton />}>
      <FindSimilarAxieContent params={resolvedParams} />
    </Suspense>
  );
}
