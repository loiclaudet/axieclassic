"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { useRewards } from "./rewards-context";

export function RewardsToggle() {
  const { showRewards, setShowRewards, isLoaded } = useRewards();

  if (!isLoaded) {
    return (
      <Button
        variant="default"
        size="sm"
        className="text-xs opacity-0 md:text-sm"
        aria-hidden="true"
      >
        <span>show rewards</span>
        <Image src="/axs.png" alt="AXS" width={16} height={16} />
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      size="sm"
      className="text-xs md:text-sm"
      onClick={() => setShowRewards(!showRewards)}
      aria-pressed={showRewards}
    >
      <span>{showRewards ? "hide" : "show"}</span>
      <Image src="/axs.png" alt="AXS" width={16} height={16} />
    </Button>
  );
}
