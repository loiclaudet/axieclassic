import { FindSimilarAxie } from "~/components/find-similiar-axie";
import { getAxie } from "~/data";

export type FindSimilarProps = {
  params: { id: string };
};

export const FindSimilarAxieContent = async ({ params }: FindSimilarProps) => {
  const { id } = params;
  const axie = await getAxie(id);
  if ("error" in axie) {
    return <p>{axie.message}</p>;
  }

  return <FindSimilarAxie axieId={id} axie={axie} />;
};
