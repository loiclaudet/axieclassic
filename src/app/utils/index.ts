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

export const isValidRoninAddress = (roninAddress: string) =>
  /^0x[a-fA-F0-9]{40}$/.test(roninAddress);

export const isValidRNS = (rns: string): boolean => /^[\w-]+\.ron$/.test(rns);

export const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
