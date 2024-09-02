import Image from "next/image";
import { pipe } from "fp-ts/lib/function";
import { BlinkingGreenDot } from "~/components/blinking-dot";
import { Fighters } from "~/components/fighters";
import { getArenaBattles } from "~/data";
import { CONSIDERED_ONLINE_DURATION_IN_MIN } from "~/lib/constant";

type TeamProps = {
  clientID: string;
  imagePriority?: boolean;
};

export async function Team({ clientID, imagePriority = false }: TeamProps) {
  const battles = await getArenaBattles(clientID, { limit: 1 });

  if ("error" in battles) {
    return (
      <div className="flex flex-1 flex-col items-center">
        <div className="hidden flex-1 items-center gap-8 md:flex">
          {Array.from({ length: 3 }).map((_, i) => (
            <Image
              key={`placeholder-md-${i}`}
              className="opacity-50"
              src={`/body-normal.png`}
              width={110}
              height={95}
              alt="placeholder"
            />
          ))}
        </div>
        <div className="flex gap-6 self-center md:hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <Image
              key={`placeholder-sm-${i}`}
              className="opacity-50"
              src={`/body-normal.png`}
              width={80}
              height={69}
              alt="placeholder"
            />
          ))}
        </div>
        <p className="w-full pb-2 pl-4 pt-1 text-xs md:text-center">
          ⚠ Error fetching battle data, please reload the page.
        </p>
      </div>
    );
  }

  const lastBattle = battles.items[0];

  if (!lastBattle) {
    return <p className="flex-grow text-center">no battles</p>;
  }

  const playedRecently = pipe(
    lastBattle.createdAt,
    getRelativeTimeStamp,
    isLessThan(CONSIDERED_ONLINE_DURATION_IN_MIN * 60 * 1000),
  );

  const lastBattleFighterIDs = lastBattle.team.find(
    (team) => team.owner === clientID,
  )?.fighterIDs;

  if (!lastBattleFighterIDs) {
    return <p>no team</p>;
  }

  return (
    <>
      {playedRecently && (
        <div className="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-10">
          <BlinkingGreenDot />
        </div>
      )}
      <Fighters
        fighterIDs={lastBattleFighterIDs}
        imagePriority={imagePriority}
      />
    </>
  );
}

const getRelativeTimeStamp = (dateString: string) =>
  Date.now() - Date.parse(dateString);

const isLessThan = (threshold: number) => (n: number) => n < threshold;
