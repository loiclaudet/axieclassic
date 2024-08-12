import { FaCircle as CircleIcon } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { CONSIDERED_ONLINE_DURATION_IN_MIN } from "~/lib/constant";

export const BlinkingGreenDot = () => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>
          <CircleIcon className="h-2 w-2 animate-pulse cursor-help select-none text-seafoam-green-700 md:h-2.5 md:w-2.5" />
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={6}
          className="rounded border-neutral-separator-dark bg-neutral-bg-dark text-neutral-100"
        >
          <p>active less than {CONSIDERED_ONLINE_DURATION_IN_MIN}min ago</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
