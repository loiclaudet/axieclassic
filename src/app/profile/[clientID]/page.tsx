import { Suspense } from "react";
import { Battles } from "~/app/profile/[clientID]/battles";

export default function Page({ params }: { params: { clientID: string } }) {
  const { clientID } = params;
  return (
    <main className="py-4">
      <Suspense fallback={<p>loading battles...</p>}>
        <Battles clientID={clientID} />
      </Suspense>
    </main>
  );
}
