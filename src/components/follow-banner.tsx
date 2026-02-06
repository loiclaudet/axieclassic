"use client";

import { useState } from "react";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { useLocalStorage } from "~/hook/use-local-storage";
import { X_USERNAME } from "~/lib/constant";

export function FollowBanner() {
  const [hasFollowed, setHasFollowed, isLoaded] = useLocalStorage(
    "hasFollowedOnX",
    false,
  );
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isLoaded || hasFollowed || isDismissed) {
    return null;
  }

  return (
    <div
      role="banner"
      className="relative flex items-center justify-center gap-1 bg-salmon-700 px-4 py-2 text-sm text-white/80 sm:text-base"
    >
      <span>Support the project —</span>
      <a
        href={`https://x.com/intent/follow?screen_name=${X_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-white underline decoration-white/50 hover:decoration-white"
        onClick={() => setHasFollowed(true)}
      >
        follow Lodz on 𝕏
      </a>
      <span>, it&apos;s free!</span>
      <button
        onClick={() => setIsDismissed(true)}
        className="absolute right-2 text-white/60 hover:text-white sm:right-4"
        aria-label="Dismiss banner"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
