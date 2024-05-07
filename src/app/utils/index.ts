export const calculateTimeLeft = (
  endTime: string,
): {
  days: number;
  hours: number;
  minutes: number;
} | null => {
  const now = new Date().getTime();
  const endTimeInMs = new Date(endTime).getTime();
  const difference = endTimeInMs - now;

  if (difference <= 0) {
    return null;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);

  return { days, hours, minutes };
};
