import { Button } from "~/components/ui/button";
import { getProfile } from "~/data";
import {
  clientSocialsByClientID,
  Social,
  socialURLBySocial,
} from "~/lib/socials";
import { LuTwitch as TwitchIcon } from "react-icons/lu";
import { FaXTwitter as XIcon } from "react-icons/fa6";
import { LuFacebook as FacebookIcon } from "react-icons/lu";
import { LuYoutube as YoutubeIcon } from "react-icons/lu";
import { RoninAddress } from "~/components/ronin-address";
import { ColoredName } from "~/components/colored-name";

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
  const { name: guildName } = guild;

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
      {socials && (
        <ul className="mb-4 flex gap-2">
          {Object.entries(socials).map(([social, username]) => (
            <li key={social} className="group">
              <Button asChild size="icon">
                <a
                  href={`${socialURLBySocial.get(social as Social)}/${username}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIcon social={social as Social} />
                </a>
              </Button>
            </li>
          ))}
        </ul>
      )}
      <p className="text-center text-sm text-neutral-icon-dark">{guildName}</p>
    </section>
  );
};

const socialIconBySocial = new Map<Social, React.ElementType>([
  ["twitch", TwitchIcon],
  ["x", XIcon],
  ["facebook", FacebookIcon],
  ["youtube", YoutubeIcon],
]);

type SocialIconProps = {
  social: Social;
};

const SocialIcon = ({ social }: SocialIconProps) => {
  const Icon = socialIconBySocial.get(social)!;
  return (
    <Icon className="h-5 w-5 text-neutral-icon-dark group-hover:text-neutral-100 group-active:text-neutral-100" />
  );
};
