"use client";

import Image from "next/image";
import { useCountDown } from "~/app/hook";

type CountDownProps = {
  endTime: string;
};

export const Countdown = ({ endTime }: CountDownProps) => {
  const timeLeft = useCountDown(endTime);

  if (!timeLeft) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <Image src={`/clock.svg`} width={10} height={10} alt="clock" />
      <p className="text-xs italic text-gray-300">
        <span>Ends in&nbsp;</span>
        <TimeLeft timeLeft={timeLeft} />
      </p>
    </div>
  );
};

const TimeLeft = ({
  timeLeft,
}: {
  timeLeft: { days: number; hours: number; minutes: number };
}) => {
  const { days, hours, minutes } = timeLeft;

  if (days > 0) {
    return (
      <>
        <span className="font-semibold">{`${days} ${days > 1 ? "days" : "day"}`}</span>
        {hours > 0 && (
          <>
            <span>&nbsp;and&nbsp;</span>
            <span className="font-semibold">{`${hours} ${hours > 1 ? "hours" : "hour"}`}</span>
          </>
        )}
      </>
    );
  } else if (hours > 0) {
    return (
      <>
        <span className="font-semibold text-orange-500">{`${hours} ${hours > 1 ? "hours" : "hour"}`}</span>
        {minutes > 0 && hours < 3 && (
          <>
            <span>&nbsp;and&nbsp;</span>
            <span className="font-semibold text-orange-500">{`${minutes} min`}</span>
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        {minutes > 0 && (
          <span className="text-sm font-semibold text-red-500">{`${minutes} ${minutes > 1 ? "minutes" : "minute"}`}</span>
        )}
      </>
    );
  }
};
