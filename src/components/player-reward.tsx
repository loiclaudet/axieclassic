"use client";

import Image from "next/image";
import { useRewards } from "./rewards-context";

type PlayerRewardProps = {
  reward: number | undefined;
};

export function PlayerReward({ reward }: PlayerRewardProps) {
  const { showRewards, isLoaded } = useRewards();

  if (!isLoaded || !showRewards || !reward) {
    return null;
  }

  const displayReward = reward / 10_000;

  return (
    <div className="flex items-center justify-center gap-0.5 text-[10px] text-neutral-400">
      <span>{displayReward}</span>
      <Image src="/axs.png" alt="AXS" width={12} height={12} />
    </div>
  );
}
