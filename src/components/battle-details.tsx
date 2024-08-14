import { LuClock as ClockIcon } from "react-icons/lu";
import { cn } from "~/lib/utils";
import type { BattleStatus, PvpType } from "~/lib/definitions";
import { Button } from "./ui/button";
import { Badge } from "./badge";
import { BattleStatusText } from "./battle-status";

type BattleDetailsProps = {
  pvpType: PvpType;
  durationFromNow: number;
  status: BattleStatus;
  uuid: string;
  className?: string;
};

export const BattleDetails = ({
  pvpType,
  durationFromNow,
  status,
  uuid,
  className,
}: BattleDetailsProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-1 md:flex-col md:p-2",
        className,
      )}
    >
      <div className="flex items-center gap-2 md:flex-col">
        <Badge pvpType={pvpType} />
        <Duration durationFromNow={durationFromNow} />
      </div>
      <BattleStatusText status={status} />
      <Button asChild size="sm">
        <a
          href={`https://cdn.axieinfinity.com/game/deeplink.html?f=rpl&q=${uuid}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          replay
        </a>
      </Button>
    </div>
  );
};

const Duration = ({ durationFromNow }: { durationFromNow: number }) => (
  <div className="flex items-center gap-1 text-xs">
    <ClockIcon width={12} height={12} />
    {durationFromNow > 1000 * 60 * 60 * 24 ? (
      <span>{Math.floor(durationFromNow / (1000 * 60 * 60 * 24))}d</span>
    ) : durationFromNow > 1000 * 60 * 60 ? (
      <span>{Math.floor(durationFromNow / (1000 * 60 * 60))}h</span>
    ) : (
      <span>{Math.floor(durationFromNow / (1000 * 60))}m</span>
    )}
    <span>ago</span>
  </div>
);
