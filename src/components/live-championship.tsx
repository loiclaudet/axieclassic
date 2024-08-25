import { LuTwitch as TwitchIcon } from "react-icons/lu";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
export const LiveChampionShip = () => {
  return (
    <div className="flex flex-col items-center gap-5 px-2 pb-2.5 pt-2 md:flex-row">
      <div className="items-center gap-2 md:flex">
        <p className="inline pr-2 text-xl font-medium md:block md:pr-0">
          Watch live season championship on Twitch!
        </p>
        <TwitchIcon className="inline h-6 w-6 font-bold text-neutral-100" />
      </div>
      <div className="flex items-center gap-5">
        <Button asChild>
          <a
            href={`http://twitch.tv/axieinfinity`}
            target="_blank"
            rel="noreferrer"
            className="items-bottom inline-flex min-w-24 gap-2"
            style={{
              backgroundColor: "#f5f5f5",
              color: "#222",
            }}
          >
            <span>🇺🇸</span>
            <span>watch</span>
          </a>
        </Button>
        <Button asChild>
          <a
            href={`https://www.twitch.tv/kamisama4e`}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "items-bottom inline-flex min-w-24 gap-2 bg-neutral-100",
            )}
            style={{
              backgroundColor: "#f5f5f5",
              color: "#222",
            }}
          >
            <span>🇪🇸</span>
            <span>ver</span>
          </a>
        </Button>
      </div>
    </div>
  );
};
