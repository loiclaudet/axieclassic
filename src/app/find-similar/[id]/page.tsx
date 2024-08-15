import { Suspense } from "react";
import {
  FindSimilarAxieContent,
  type FindSimilarProps,
} from "~/components/find-similar-axie-content";
import { FindSimilarSkeleton } from "~/components/skeletons";

export default function FindSimilarPage({ params }: FindSimilarProps) {
  return (
    <Suspense fallback={<FindSimilarSkeleton />}>
      <FindSimilarAxieContent params={params} />
    </Suspense>
  );
}
