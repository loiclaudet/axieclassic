import { useEffect, useState } from "react";
import { calculateTimeLeft } from "~/app/utils";

export const useCountDown = (endTime: string, refreshInterval = 1000 * 60) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, refreshInterval); // update every minute

    return () => clearInterval(timer);
  }, [endTime, refreshInterval]);

  return timeLeft;
};
