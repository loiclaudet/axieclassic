import Link from "next/link";
import Image from "next/image";
import type { FighterIDs } from "~/lib/definitions";
import { cn } from "~/lib/utils";

type FightersProps = {
  fighterIDs: FighterIDs;
  lookRight?: boolean;
  imagePriority?: boolean;
};
export const Fighters = ({
  fighterIDs,
  lookRight = false,
  imagePriority = false,
}: FightersProps) => (
  <ul className="flex items-center">
    {fighterIDs.map((fighterID) => (
      <li
        key={fighterID}
        className={cn(
          lookRight && "scale-x-[-1] transform",
          " max-h-[82px] max-w-[110px] md:max-h-[112px] md:max-w-[150px]",
        )}
      >
        <div className="duration-400 overflow-hidden transition-transform ease-in hover:scale-110">
          <Link href={`/find-similar/${fighterID}`} prefetch={false}>
            <Image
              priority={imagePriority}
              src={`https://axiecdn.axieinfinity.com/axies/${fighterID}/axie/axie-full-transparent.png`}
              alt={`Axie ${fighterID}`}
              width={150}
              height={112}
              className="h-[82px] w-[110px] scale-90 object-cover md:h-[112px] md:w-[150px]"
              style={{
                objectPosition: "40% 20%",
                objectFit: "cover",
                transform: "scale(1.4)",
              }}
            />
          </Link>
        </div>
      </li>
    ))}
  </ul>
);
