import { Suspense } from "react";
import { Battles } from "~/app/profile/[clientID]/battles";

export default function Page({ params }: { params: { clientID: string } }) {
  const { clientID } = params;
  return (
    <div>
      <h1>My client ID: {clientID}</h1>
      <Suspense fallback={<p>loading battles...</p>}>
        <Battles clientID={params.clientID} />
      </Suspense>
    </div>
  );
}
