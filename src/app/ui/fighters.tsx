import Image from "next/image";
import type { FighterIDs } from "~/app/lib/definitions";

type FightersProps = {
  fighterIDs: FighterIDs;
};
export const Fighters = ({ fighterIDs }: FightersProps) => (
  <ul className="flex">
    {fighterIDs.map((fighterID) => (
      <li
        key={fighterID}
        className="duration-400 transition-transform ease-in hover:scale-110"
      >
        <a
          href={`https://app.axieinfinity.com/marketplace/axies/${fighterID}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            key={fighterID}
            width={150}
            height={100}
            className="object-contain"
            alt={`Axie #${fighterID}`}
            src={`https://axiecdn.axieinfinity.com/axies/${fighterID}/axie/axie-full-transparent.png`}
          />
        </a>
      </li>
    ))}
  </ul>
);
