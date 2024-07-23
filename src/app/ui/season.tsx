import { getGuildSeason } from "~/app/lib/data";
import { calculateTimeLeft } from "~/app/utils";
import { Countdown } from "./countdown";

export const Season = async () => {
  const guildSeason = await getGuildSeason();
  if ("error" in guildSeason) {
    return <div>{guildSeason.message}</div>;
  }

  const { season, endTime, startTime } = guildSeason;

  const hasStarted = new Date(startTime).getTime() < new Date().getTime();
  const timeLeft = calculateTimeLeft(endTime);

  if (!hasStarted || !timeLeft) {
    return <div>Off season 😴</div>;
  }

  return (
    <div className="flex shrink-0 flex-col items-center sm:items-start">
      <h2 className="text-xl font-semibold text-white">Season {season}</h2>
      <Countdown endTime={endTime} />
    </div>
  );
};
