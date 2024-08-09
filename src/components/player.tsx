import type { Player } from "~/lib/definitions";
import { Suspense } from "react";
import Link from "next/link";
import { TeamSkeleton } from "~/components/skeletons";
import { ColoredName } from "~/components/colored-name";
import { getArenaBattles } from "~/data";
import { Fighters } from "./fighters";
import { pipe } from "fp-ts/lib/function";
const DURATION_IN_MIN = 10;

type PlayerProps = {
  player: Player;
};

export default function Player({ player }: PlayerProps) {
  const { name, score, rank, clientID } = player;
  return (
    <div className="relative flex flex-col sm:flex-row sm:items-center">
      <div className="flex flex-col gap-2 px-10 pb-4 pt-8 sm:p-4">
        <Link prefetch={false} href={`/profile/${clientID}`}>
          <h2 className="line-clamp-2 w-72 text-lg leading-6 text-[#EDEDED] hover:underline">
            <ColoredName name={name} />
          </h2>
        </Link>
        <div className="flex gap-4">
          <span>#{rank}</span>
          <div className="flex items-center gap-1">
            <span className="text-xs">🏆</span>
            <span>{score}</span>
          </div>
        </div>
      </div>
      <Suspense fallback={<TeamSkeleton />}>
        <Team clientID={clientID} teamImagePriority={rank <= 3} />
      </Suspense>
    </div>
  );
}

async function BlinkingGreenOnlineDot() {
  return (
    <div className="animate-pulse cursor-help select-none text-[10px] sm:text-[8px]">
      🟢
    </div>
  );
}

type TeamProps = {
  clientID: string;
  teamImagePriority?: boolean;
};

async function Team({ clientID, teamImagePriority }: TeamProps) {
  const battles = await getArenaBattles(clientID, { limit: 1 });

  if ("error" in battles) {
    return <p className="flex-grow text-center">{battles.message}</p>;
  }

  const lastBattle = battles.items[0];

  if (!lastBattle) {
    return <p className="flex-grow text-center">no battles</p>;
  }

  const playedRecently = pipe(
    lastBattle.createdAt,
    getRelativeTimeStamp,
    isLessThan(DURATION_IN_MIN * 60 * 1000),
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
        <div
          title={`played less than ${DURATION_IN_MIN}min ago`}
          className="absolute left-3 top-[43px] sm:left-1 sm:top-[51px]"
        >
          <BlinkingGreenOnlineDot />
        </div>
      )}
      <Fighters
        fighterIDs={lastBattleFighterIDs}
        imagePriority={teamImagePriority}
      />
    </>
  );
}

const getRelativeTimeStamp = (dateString: string) =>
  Date.now() - Date.parse(dateString);

const isLessThan = (threshold: number) => (n: number) => n < threshold;
