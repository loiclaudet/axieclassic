import Image from "next/image";
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
        <a
          href={`https://app.axieinfinity.com/marketplace/axies/${fighterID}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            priority={imagePriority}
            key={fighterID}
            width={180}
            height={135}
            className={`object-contain ${lookRight ? "scale-x-[-1] transform" : ""}`}
            alt={`Axie #${fighterID}`}
            src={`https://axiecdn.axieinfinity.com/axies/${fighterID}/axie/axie-full-transparent.png`}
          />
        </a>
      </li>
    ))}
  </ul>
);
