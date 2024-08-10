import { getProfile } from "~/data";
import { clientSocialsByClientID } from "~/lib/socials";

import { RoninAddress } from "~/components/ronin-address";
import { ColoredName } from "~/components/colored-name";
import { SocialIcons } from "~/components/social-icons";

type ProfileProps = {
  clientID: string;
};

export const Profile = async ({ clientID }: ProfileProps) => {
  const socials = clientSocialsByClientID.get(clientID);

  const profile = await getProfile(clientID);
  if ("error" in profile) {
    return <p className="flex-grow text-center">{profile.message}</p>;
  }
  const { name, guild } = profile;
  const guildName = guild?.name;

  return (
    <section className="mb-6 flex flex-col items-center justify-center gap-3 self-stretch border-b border-b-neutral-separator-dark bg-neutral-aside-dark p-3 sm:sticky sm:top-0 sm:z-10 sm:bg-neutral-aside-dark/70 sm:backdrop-blur-md">
      <div className="flex flex-col items-center">
        <h2 className="max-w-96 text-center text-2xl font-bold text-neutral-100">
          {<ColoredName name={name} />}
        </h2>
        <div className="hidden sm:block">
          <RoninAddress address={clientID} size={12} />
        </div>
      </div>
      {socials && <SocialIcons socials={socials} />}
      {guildName && (
        <p className="text-center text-sm text-neutral-icon-dark">
          {guildName}
        </p>
      )}
    </section>
  );
};
