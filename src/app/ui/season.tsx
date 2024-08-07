import { getGuildSeason } from "~/app/data";
import { calculateTimeLeft } from "~/app/utils";
import { Countdown } from "./countdown";
import { formatDate } from "~/app/lib/utils";

export const Season = async () => {
  const guildSeason = await getGuildSeason();
  if ("error" in guildSeason) {
    return <div>{guildSeason.message}</div>;
  }

  const { season, endTime, startTime } = guildSeason;

  const hasStarted = new Date(startTime).getTime() < new Date().getTime();
  // temporarily fix for season 4 wrong end time api response
  const customEndTime = season > 4 ? endTime : "2024-08-11T09:00:00.000Z";
  const timeLeft = calculateTimeLeft(customEndTime);

  if (!hasStarted || !timeLeft) {
    return <div>Off season 😴</div>;
  }

  return (
    <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-start sm:gap-1">
      <h2 className="text-xl font-semibold text-white">Season {season}</h2>
      <div className="flex flex-col text-[10px] text-neutral-100">
        <Countdown endTime={customEndTime} />
        <span className="italic leading-tight">
          {formatDate(new Date(customEndTime))}
        </span>
      </div>
    </div>
  );
};
