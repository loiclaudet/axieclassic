import { Suspense } from "react";
import { FindSimilarAxieContent } from "~/components/find-similar-axie-content";
import type { FindSimilarProps } from "~/components/find-similar-axie-content";
import { Modal } from "~/components/modal";
import { FindSimilarSkeleton } from "~/components/skeletons";

export default async function FindSimilarPage({ params }: FindSimilarProps) {
  return (
    <Modal>
      <Suspense fallback={<FindSimilarSkeleton />}>
        <FindSimilarAxieContent params={params} />
      </Suspense>
    </Modal>
  );
}
