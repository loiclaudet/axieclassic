import { cn } from "~/lib/utils";

type DashedLineProps = {
  direction?: "horizontal" | "vertical";
  color?: string;
  size?: number;
  className?: string;
};

export const DashedLine = ({
  direction = "horizontal",
  color = "hsl(227, 8%, 23%)", // neutral-separator-dark
  size = 3,
  className,
}: DashedLineProps) => (
  <div className={cn(className)}>
    <svg
      width={direction === "horizontal" ? "100%" : size}
      height={direction === "horizontal" ? size : "100%"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1={0}
        y1={0}
        x2={direction === "horizontal" ? "100%" : 0}
        y2={direction === "horizontal" ? 0 : "100%"}
        stroke={color}
        strokeWidth={size}
        strokeDasharray="5,5"
      />
    </svg>
  </div>
);
