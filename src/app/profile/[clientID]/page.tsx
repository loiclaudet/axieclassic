import { Suspense } from "react";
import { Battles } from "~/app/profile/[clientID]/battles";

export default function Page({ params }: { params: { clientID: string } }) {
  const { clientID } = params;
  return (
    <div>
      <Suspense fallback={<p>loading battles...</p>}>
        <Battles clientID={clientID} />
      </Suspense>
    </div>
  );
}
