import { Suspense } from "react";
import { PiStarFourBold as StarIcon } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import { pipe } from "fp-ts/lib/function";
import type { Player } from "~/lib/definitions";
import { TeamSkeleton } from "~/components/skeletons";
import { ColoredName } from "~/components/colored-name";
import { BlinkingGreenDot } from "~/components/blinking-dot";
import { SocialIcons } from "~/components/social-icons";
import { Fighters } from "~/components/fighters";
import { getArenaBattles } from "~/data";
import { clientSocialsByClientID } from "~/lib/socials";
import { CONSIDERED_ONLINE_DURATION_IN_MIN } from "~/lib/constant";

type PlayerProps = {
  player: Player;
};

export default function Player({ player }: PlayerProps) {
  const { name, score, rank, clientID, guild } = player;
  const guildName = guild?.name;
  const socials = clientSocialsByClientID.get(clientID);

  return (
    <div className="relative flex">
      <div className="flex w-12 shrink-0 flex-col md:w-20">
        <div className="flex basis-1/2 items-center justify-center border-b border-dashed border-neutral-separator-dark">
          <div className="flex items-baseline text-neutral-100">
            <span className="text-xs">#</span>
            <span className="text-xl font-bold">{rank}</span>
          </div>
        </div>
        <div className="flex basis-1/2 items-center justify-center">
          <div className="flex flex-col items-center justify-center text-neutral-100">
            <StarIcon className="h-4 w-4" />
            <span>{score}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-l border-dashed border-neutral-separator-dark md:flex-row">
        <div className="flex w-60 flex-col gap-2 px-4 py-2 md:py-4">
          <Link prefetch={false} href={`/profile/${clientID}`}>
            <h2 className="w-60 text-lg leading-5 text-neutral-100 hover:underline md:line-clamp-2">
              <ColoredName name={name} />
            </h2>
          </Link>
          {socials && (
            <SocialIcons
              iconClassName="h-6 w-6 rounded-lg px-1 py-0.5"
              listClassName="md:mb-3"
              socials={socials}
            />
          )}
          <p className="text-sm text-neutral-icon-dark">{guildName}</p>
        </div>
        <Suspense fallback={<TeamSkeleton />}>
          <Team clientID={clientID} teamImagePriority={rank <= 3} />
        </Suspense>
      </div>
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
    return (
      <div className="flex flex-col">
        <div className="hidden md:flex">
          <Image
            src={`/placeholder.png`}
            width={170}
            height={90}
            alt="placeholder"
          />
          <Image
            src={`/placeholder.png`}
            width={170}
            height={90}
            alt="placeholder"
          />
          <Image
            src={`/placeholder.png`}
            width={170}
            height={90}
            alt="placeholder"
          />
        </div>
        <div className="flex self-center md:hidden">
          <Image
            src={`/placeholder.png`}
            width={80}
            height={110}
            alt="placeholder"
          />
          <Image
            src={`/placeholder.png`}
            width={80}
            height={110}
            alt="placeholder"
          />
          <Image
            src={`/placeholder.png`}
            width={80}
            height={110}
            alt="placeholder"
          />
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
        imagePriority={teamImagePriority}
      />
    </>
  );
}

const getRelativeTimeStamp = (dateString: string) =>
  Date.now() - Date.parse(dateString);

const isLessThan = (threshold: number) => (n: number) => n < threshold;
