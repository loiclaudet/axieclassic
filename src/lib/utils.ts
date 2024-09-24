import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const shortenHash = (hash: string) =>
  `${hash.slice(0, 6)}...${hash.slice(-4)}`;

export const formatDate = (date: Date) => {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    hour12: false,
  }).format(date);

  return formattedDate.replace(",", "") + " UTC";
};

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

/**
 * Split an array into chunks of a specific size
 * @param arr The array to split
 * @param size The size of each chunk
 * @returns An array of chunks
 */
export const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
