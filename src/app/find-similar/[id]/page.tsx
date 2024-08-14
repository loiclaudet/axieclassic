import Link from "next/link";
import { FindSimilarAxie } from "~/components/find-similiar-axie";
import { getAxie } from "~/data";

export default async function FindSimilarPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span className="text-xl">
        404 -{" "}
        <Link className="underline" href={"/"}>
          Back home
        </Link>
      </span>
    </div>
  );

  // const axie = await getAxie("11423254");
  // if ("error" in axie) {
  //   // TODO: throw an error and create a custom error page
  //   return <p>{axie.message}</p>;
  // }

  // return <FindSimilarAxie axieId={"11423254"} axie={axie} />;
}
