import { getGuild } from "~/data/guild";
import emojiFlags from "emoji-flags";
import Image from "next/image";
import { SocialIcons } from "~/components/social-icons";
import { guildSocialsByGuildID } from "~/lib/socials";
import { LuUsers as UsersIcon } from "react-icons/lu";
import { GuildUsers } from "./guild-users";

type GuildProps = {
  id: string;
};

export const Guild = async ({ id }: GuildProps) => {
  const guild = await getGuild(id);

  if ("error" in guild) {
    return <p className="flex-grow text-center">{guild.message}</p>;
  }
  const socials = guildSocialsByGuildID.get(id);

  const {
    name,
    countryCode,
    avatar,
    // description,
    memberCounts,
    memberLimits,
  } = guild;
  const country = emojiFlags.countryCode(countryCode);
  return (
    <>
      <section className="flex w-full flex-col items-center gap-4 border-b border-b-neutral-separator-dark bg-neutral-aside-dark p-4 md:sticky md:top-0 md:z-10 md:bg-neutral-aside-dark/70 md:p-6 md:backdrop-blur-md">
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-center text-2xl font-bold text-neutral-100">
            {name}
          </h2>
          {socials && (
            <SocialIcons
              iconClassName="h-[26px] w-[26px] rounded-lg px-.5 py-px"
              listClassName="md:mb-3"
              socials={socials}
            />
          )}
        </div>
        <div className="relative h-32 w-32">
          <Image
            src={
              avatar === "custom"
                ? `https://cdn.skymavis.com/mavisx/dlc-central/remote-config/classic-m/custom-guild-avatar/${id}.png`
                : avatar === "default"
                  ? `/guild-avatars/avatar_20.png`
                  : `/guild-avatars/${avatar}.png`
            }
            width={128}
            height={128}
            alt={name}
          />
          <span
            className="absolute bottom-0 right-4 text-2xl leading-none md:-bottom-2.5 md:right-2 md:text-3xl"
            title={country.name}
          >
            {country.emoji}
          </span>
        </div>
      </section>
      <section className="w-full">
        <div className="flex items-center justify-center gap-2 pb-2 pt-4">
          <UsersIcon className="h-6 w-6" />
          <span className="text-xl font-medium">
            {memberCounts}/{memberLimits}
          </span>
        </div>
        <GuildUsers guildID={id} />
      </section>
    </>
  );
};
