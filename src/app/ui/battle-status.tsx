type BattleStatusProps = {
  status: "victory" | "defeat" | "draw";
};

export const BattleStatus = ({ status }: BattleStatusProps) => {
  return (
    <span
      className={`text-lg font-semibold ${
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
