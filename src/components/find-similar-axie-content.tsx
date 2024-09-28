import { FindSimilarAxie } from "~/components/find-similiar-axie";
import { getAxie } from "~/data";

export type FindSimilarProps = {
  params: Promise<{ id: string }>;
};

export const FindSimilarAxieContent = async ({ params }: FindSimilarProps) => {
  const axieId = (await params).id;
  const axie = await getAxie(axieId);

  if ("error" in axie) {
    return <p>{axie.message}</p>;
  }

  return <FindSimilarAxie axieId={axieId} axie={axie} />;
};
