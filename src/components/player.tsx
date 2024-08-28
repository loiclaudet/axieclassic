import { Suspense } from "react";
import { PiStarFourBold as StarIcon } from "react-icons/pi";
import { LuExternalLink as ExternalLinkIcon } from "react-icons/lu";
import Link from "next/link";
import type { Player } from "~/lib/definitions";
import { TeamSkeleton } from "~/components/skeletons";
import { ColoredName } from "~/components/colored-name";
import { SocialIcons } from "~/components/social-icons";
import { userSocialsByClientID } from "~/lib/socials";
import { Team } from "~/components/team";

type PlayerProps = {
  player: Player;
};

export default function Player({ player }: PlayerProps) {
  const { name, score, rank, clientID, guild } = player;
  const socials = userSocialsByClientID.get(clientID);

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
      <div className="flex flex-1 flex-col border-l border-dashed border-neutral-separator-dark md:flex-row">
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
          {guild && (
            <Link
              className="group inline-flex items-center gap-1 transition-colors hover:text-neutral-100 hover:underline"
              href={`/guilds/${guild.id}`}
            >
              <p className="text-center text-sm hover:underline">
                {guild.name}
              </p>
              <ExternalLinkIcon className="h-3 w-3 text-neutral-100 transition-all group-hover:scale-125" />
            </Link>
          )}
        </div>
        <Suspense fallback={<TeamSkeleton />}>
          <Team clientID={clientID} />
        </Suspense>
      </div>
    </div>
  );
}
