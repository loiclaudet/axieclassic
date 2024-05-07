import { getSeason } from "~/app/lib/data";
import { Countdown } from "./countdown";
import { calculateTimeLeft } from "~/app/utils";

export const Season = async () => {
  const seasonInfo = await getSeason();
  if ("error" in seasonInfo) {
    return <div>{seasonInfo.message}</div>;
  }

  const { season, endTime } = seasonInfo;
  const timeLeft = calculateTimeLeft(endTime);

  if (!timeLeft) {
    return <div>Off season 😴</div>;
  }

  return (
    <div className="flex shrink-0 flex-col items-center sm:items-start">
      <h2 className="text-xl font-semibold text-white">Season {season}</h2>
      <Countdown endTime={endTime} />
    </div>
  );
};
