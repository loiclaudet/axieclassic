import Image from "next/image";
import Link from "next/link";
import type { FighterIDs } from "~/lib/definitions";

type FightersProps = {
  fighterIDs: FighterIDs;
  lookRight?: boolean;
  imagePriority?: boolean;
};
export const Fighters = ({
  fighterIDs,
  lookRight = false,
  imagePriority,
}: FightersProps) => (
  <ul className="flex">
    {fighterIDs.map((fighterID) => (
      <li
        key={fighterID}
        className="duration-400 max-h-[135px] overflow-hidden transition-transform ease-in hover:scale-110"
      >
        <Link href={`/find-similar/${fighterID}`} prefetch={false}>
          <Image
            priority={imagePriority}
            key={fighterID}
            width={180}
            height={135}
            className={`object-contain ${lookRight ? "scale-x-[-1] transform" : ""}`}
            alt={`Axie #${fighterID}`}
            src={`https://axiecdn.axieinfinity.com/axies/${fighterID}/axie/axie-full-transparent.png`}
          />
        </Link>
      </li>
    ))}
  </ul>
);
