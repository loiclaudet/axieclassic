import { FindSimilarAxie } from "~/components/find-similiar-axie";
import { Modal } from "~/components/modal";
import { getAxie } from "~/data";

export default async function FindSimilarPage({
  params,
}: {
  params: { id: string };
}) {
  const axie = await getAxie(params.id);
  if ("error" in axie) {
    throw new Error(axie.message);
  }

  return (
    <Modal>
      <FindSimilarAxie axieId={params.id} axie={axie} />
    </Modal>
  );
}
