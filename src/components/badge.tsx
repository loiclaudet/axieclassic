import type { PvpType } from "~/lib/definitions";

type BadgeProps = {
  pvpType: PvpType;
};

export const Badge = ({ pvpType }: BadgeProps) => {
  const badgeClassName = badgeClassNameByPvpType(pvpType);

  return (
    <div className={`rounded-full px-1.5 py-0.5 text-xs ${badgeClassName}`}>
      {pvpType}
    </div>
  );
};

const badgeClassNameByPvpType = (pvpType: PvpType) => {
  switch (pvpType) {
    case "arena":
      return "bg-peach-800/50 text-peach-200";
    case "colosseum":
      return "bg-orange-800/50 text-orange-200";
    case "tournament":
      return "bg-mystic-800/50 text-mystic-200";
    case "challenge":
      return "bg-neutral-800/50 text-neutral-200";
  }
};
