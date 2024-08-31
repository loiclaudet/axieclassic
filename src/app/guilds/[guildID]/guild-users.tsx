import { Suspense } from "react";
import { TeamSkeleton } from "~/components/skeletons";
import { Team } from "~/components/team";
import { getProfiles } from "~/data";
import { getGuildUsers } from "~/data/guild";
import type { GuildUser } from "~/lib/definitions";
import { TbHexagonLetterG as GuildPointIcon } from "react-icons/tb";
import { LuDog as AxieIcon } from "react-icons/lu";
import { FaArrowRight as ArrowRightIcon } from "react-icons/fa6";
import { ColoredName } from "~/components/colored-name";
import Link from "next/link";
import { SocialIcons } from "~/components/social-icons";
import { userSocialsByClientID } from "~/lib/socials";

type GuildUsersProps = {
  guildID: string;
};

export const GuildUsers = async ({ guildID }: GuildUsersProps) => {
  const guildUsers = await getGuildUsers(guildID);
  if ("error" in guildUsers) {
    return <p className="flex-grow text-center">{guildUsers.message}</p>;
  }

  // split call into two halves due to the API limit of 50 users
  const firstHalfUsers = guildUsers.slice(0, Math.floor(guildUsers.length / 2));
  const secondHalfUsers = guildUsers.slice(
    Math.floor(guildUsers.length / 2),
    guildUsers.length,
  );

  const usersProfiles = await Promise.all([
    getProfiles(firstHalfUsers.map((user) => user.clientID)),
    getProfiles(secondHalfUsers.map((user) => user.clientID)),
  ]);

  const [firstHalfProfiles, secondHalfProfiles] = usersProfiles;

  if ("error" in firstHalfProfiles || "error" in secondHalfProfiles) {
    return <p className="flex-grow text-center">Error fetching profiles.</p>;
  }
  const flattenedProfiles = [...firstHalfProfiles, ...secondHalfProfiles];

  return (
    <ul className="flex flex-col md:border-t md:border-t-neutral-separator-dark">
      {guildUsers
        .sort((a, b) => b.guildPoints - a.guildPoints)
        .map((user, index) => {
          const memberName =
            flattenedProfiles.find(
              (profile) => profile.clientID === user.clientID,
            )?.name ?? "???";
          return (
            <li
              className="relative border-b border-b-neutral-separator-dark bg-neutral-aside-dark"
              key={user.clientID}
            >
              <GuildMember
                name={memberName}
                clientID={user.clientID}
                contributionPoints={user.contributionPoints}
                guildPoints={user.guildPoints}
                role={user.role}
                imagePriority={index <= 5}
              />
            </li>
          );
        })}
    </ul>
  );
};

type GuildMemberProps = Pick<
  GuildUser,
  "clientID" | "contributionPoints" | "guildPoints" | "role"
> & {
  name: string;
  imagePriority?: boolean;
};

const GuildMember = ({
  name,
  clientID,
  contributionPoints,
  guildPoints,
  role,
  imagePriority = false,
}: GuildMemberProps) => {
  const socials = userSocialsByClientID.get(clientID);

  return (
    <div className="relative flex">
      <div className="flex w-12 shrink-0 flex-col md:w-20">
        <div className="flex basis-1/2 items-center justify-center border-b border-dashed border-neutral-separator-dark">
          <div className="flex flex-col items-center justify-center text-neutral-100">
            <GuildPointIcon className="h-4 w-4" />
            <span className="text-base font-semibold">
              {Intl.NumberFormat().format(guildPoints)}
            </span>
          </div>
        </div>
        <div className="flex basis-1/2 items-center justify-center">
          <div className="flex flex-col items-center justify-center text-neutral-100">
            <div className="relative -translate-x-0.5">
              <AxieIcon className="h-4 w-4" />
              <ArrowRightIcon className="absolute -right-2 bottom-px h-2.5 w-2.5" />
            </div>
            <span className="text-[11px]">
              {Intl.NumberFormat().format(contributionPoints)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col border-l border-dashed border-neutral-separator-dark md:flex-row">
        <div className="flex w-60 flex-col items-start justify-center gap-2 px-3 py-2 md:py-4">
          <Link prefetch={false} href={`/profile/${clientID}`}>
            <h2 className="inline w-60 text-lg leading-5 text-neutral-100 hover:underline md:line-clamp-2">
              <ColoredName name={name} />
            </h2>
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            {role === "owner" && (
              <span
                className={`rounded-full bg-rose-800 px-1.5 py-px text-[9px] font-medium text-rose-200`}
              >
                owner
              </span>
            )}
            {socials && (
              <SocialIcons
                iconClassName="h-6 w-6 rounded-lg px-1 py-0.5"
                listClassName="md:mb-3"
                socials={socials}
              />
            )}
          </div>
        </div>
        <Suspense fallback={<TeamSkeleton />}>
          <Team imagePriority={imagePriority} clientID={clientID} />
        </Suspense>
      </div>
    </div>
  );
};
