"use client";

import Image from "next/image";
import { type ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { useRewards } from "./rewards-context";

export function RewardsToggleClient({ fallback }: { fallback: ReactNode }) {
  const { showRewards, setShowRewards, isLoaded } = useRewards();

  if (!isLoaded) return fallback;

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
