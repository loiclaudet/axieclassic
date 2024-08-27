import { LuTwitch as TwitchIcon } from "react-icons/lu";
import { FaXTwitter as XIcon } from "react-icons/fa6";
import { LuFacebook as FacebookIcon } from "react-icons/lu";
import { LuYoutube as YoutubeIcon } from "react-icons/lu";
import { AiOutlineDiscord as DiscordIcon } from "react-icons/ai";
import type { Socials, Social } from "~/lib/socials";
import { socialURLBySocial } from "~/lib/socials";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";

const socialIconBySocial = new Map<Social, React.ElementType>([
  ["twitch", TwitchIcon],
  ["x", XIcon],
  ["facebook", FacebookIcon],
  ["youtube", YoutubeIcon],
  ["discord", DiscordIcon],
]);

type SocialIconsProps = {
  socials: Socials;
  iconClassName?: string;
  listClassName?: string;
};

export const SocialIcons = ({
  socials,
  iconClassName,
  listClassName,
}: SocialIconsProps) => {
  return (
    <ul className={cn("flex gap-2", listClassName)}>
      {Object.entries(socials).map(([social, username]) => (
        <li key={social} className="group">
          <Button asChild size="icon" className={cn(iconClassName)}>
            <a
              href={`${socialURLBySocial.get(social as Social)}${username}`}
              target="_blank"
              rel="noreferrer"
            >
              <SocialIcon social={social as Social} />
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
};

type SocialIconProps = {
  social: Social;
};

const SocialIcon = ({ social }: SocialIconProps) => {
  const Icon = socialIconBySocial.get(social)!;
  return (
    <Icon className="h-5 w-5 text-neutral-icon-dark group-hover:text-neutral-100 group-active:text-neutral-100" />
  );
};
