import type { BattleStatus } from "~/lib/definitions";

type BattleStatusProps = {
  status: BattleStatus;
};

export const BattleStatusText = ({ status }: BattleStatusProps) => {
  return (
    <span
      className={`flex-1 text-center text-xl font-semibold sm:flex-grow-0 ${
        status === "draw"
          ? "text-neutral-500"
          : status === "victory"
            ? "text-seafoam-green-700"
            : "text-salmon-700"
      }`}
    >
      {status}
    </span>
  );
};
