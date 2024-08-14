import { Suspense } from "react";
import { FindSimilarAxie } from "~/components/find-similiar-axie";
import { getAxie } from "~/data";

export default async function FindSimilarPage({
  params,
}: {
  params: { id: string };
}) {
  const axie = await getAxie(params.id);
  if ("error" in axie) {
    // TODO: throw an error and create a custom error page
    return <p>{axie.message}</p>;
  }

  return <FindSimilarAxie axieId={params.id} axie={axie} />;
}
