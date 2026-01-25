"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorage } from "~/hook/use-local-storage";

type RewardsContextType = {
  showRewards: boolean;
  setShowRewards: (value: boolean | ((val: boolean) => boolean)) => void;
  isLoaded: boolean;
};

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export function RewardsProvider({ children }: { children: ReactNode }) {
  const [showRewards, setShowRewards, isLoaded] = useLocalStorage(
    "showRewards",
    false,
  );

  return (
    <RewardsContext.Provider value={{ showRewards, setShowRewards, isLoaded }}>
      {children}
    </RewardsContext.Provider>
  );
}

export function useRewards() {
  const context = useContext(RewardsContext);
  if (context === undefined) {
    throw new Error("useRewards must be used within a RewardsProvider");
  }
  return context;
}
