import Link from "next/link";
import { getProfile } from "~/data";
import { userSocialsByClientID } from "~/lib/socials";
import { LuExternalLink as ExternalLinkIcon } from "react-icons/lu";
import { RoninAddress } from "~/components/ronin-address";
import { ColoredName } from "~/components/colored-name";
import { SocialIcons } from "~/components/social-icons";

type ProfileProps = {
  clientID: string;
};

export const Profile = async ({ clientID }: ProfileProps) => {
  const socials = userSocialsByClientID.get(clientID);

  const profile = await getProfile(clientID);
  if ("error" in profile) {
    return <p className="flex-grow text-center">{profile.message}</p>;
  }
  const { name, guild } = profile;

  return (
    <section className="flex flex-col items-center justify-center gap-3 self-stretch border-b border-dashed border-neutral-separator-dark bg-neutral-aside-dark p-3 md:sticky md:top-0 md:z-10 md:basis-1/2 md:border-b-0 md:border-r md:bg-neutral-aside-dark/70 md:backdrop-blur-md">
      <div className="flex flex-col items-center">
        <h2 className="max-w-96 text-center text-2xl font-bold text-neutral-100">
          {<ColoredName name={name} />}
        </h2>
        <div className="hidden md:block">
          <RoninAddress address={clientID} size={12} />
        </div>
      </div>
      {socials && <SocialIcons socials={socials} />}
      {guild && (
        <Link
          className="group inline-flex items-center gap-1 transition-colors hover:text-neutral-100 hover:underline"
          href={`/guilds/${guild.id}`}
        >
          <p className="text-center text-sm hover:underline">{guild.name}</p>
          <ExternalLinkIcon className="h-3 w-3 text-neutral-100 transition-all group-hover:scale-125" />
        </Link>
      )}
    </section>
  );
};
