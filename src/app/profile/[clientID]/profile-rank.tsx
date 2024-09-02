import { getProfileRank } from "~/data/profile";
import type { ClientID } from "~/lib/definitions";
import Image from "next/image";
import { PiStarFourBold as StarIcon } from "react-icons/pi";

export async function ProfileRank({ clientID }: { clientID: ClientID }) {
  const profileRank = await getProfileRank(clientID);
  if ("error" in profileRank) {
    return <div>Error: {profileRank.error}</div>;
  }
  const { rank, score, tier } = profileRank;
  return (
    <section className="flex items-center justify-around gap-3 self-stretch bg-neutral-aside-dark p-3 md:flex-1 md:basis-1/2 md:bg-neutral-aside-dark/70 md:backdrop-blur-md">
      <div className="flex basis-1/3 flex-col items-center justify-center">
        <span className="text-sm leading-none md:text-base">Rank</span>
        <span className="text-xl font-bold leading-none md:text-2xl">
          {rank > 1_000_000 ? "-" : Intl.NumberFormat().format(rank)}
        </span>
      </div>
      <div className="flex basis-1/3 items-center justify-center">
        <Image
          className="h-[80px] w-[80px] md:h-[120px] md:w-[120px]"
          src={`/tiers/${tier}.png`}
          alt="tier"
          width={80}
          height={80}
        />
      </div>
      <div className="flex basis-1/3 flex-col items-center justify-center md:gap-1">
        <StarIcon className="h-4 w-4" />
        <span className="text-xl font-bold leading-none">{score}</span>
      </div>
    </section>
  );
}
