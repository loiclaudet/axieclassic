import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BATTLE_LIMIT } from "~/lib/constant";
import { DashedLine } from "./ui/dashed-line";

type TeamSkeletonProps = {
  width?: number;
};

export const TeamSkeleton = ({ width }: TeamSkeletonProps) => (
  <div className="flex gap-6 p-4">
    {new Array(3).fill(null).map((_, i) => (
      <div key={i} className="flex items-center justify-center">
        <div className="hidden sm:block">
          <Skeleton
            borderRadius={12}
            height={width ? width * 0.75 : 100}
            width={width ?? 135}
            baseColor="hsl(227 12% 15%)"
            highlightColor="hsl(227 8% 23%)"
          />
        </div>
        <div className="sm:hidden">
          <Skeleton
            borderRadius={12}
            height={width ? width * 0.75 : 60}
            width={width ?? 80}
            baseColor="hsl(227 12% 15%)"
            highlightColor="hsl(227 8% 23%)"
          />
        </div>
      </div>
    ))}
  </div>
);

export const ProfileSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="hsl(227 12% 15%)"
      highlightColor="hsl(227 8% 23%)"
    >
      <section className="mb-6 flex flex-col items-center justify-center gap-3 self-stretch border-b border-b-neutral-separator-dark bg-neutral-aside-dark p-3 sm:sticky sm:top-0 sm:z-10 sm:bg-neutral-aside-dark/70 sm:backdrop-blur-md">
        <div className="flex flex-col items-center">
          <h2 className="max-w-96 text-center text-2xl font-bold text-neutral-100">
            <Skeleton width={200} height={32} />
          </h2>
          <div className="hidden sm:block">
            <Skeleton width={250} height={14} />
          </div>
        </div>
        <Skeleton width={320} height={20} />
      </section>
    </SkeletonTheme>
  );
};

export const BattleSkeleton = () => (
  <SkeletonTheme baseColor="hsl(227 12% 15%)" highlightColor="hsl(227 8% 23%)">
    <div className="flex border-y border-b border-y-neutral-separator-dark">
      <div className="flex flex-col sm:flex-row">
        <div>
          <p className="pl-4 pt-2">
            <Skeleton width={120} height={16} />
          </p>
          <TeamSkeleton width={100} />
        </div>
        <DashedLine className="sm:hidden" />
        <DashedLine className="hidden sm:block" direction="vertical" />
        <div className="flex items-center justify-center px-4 py-1 sm:flex-col sm:gap-2 sm:p-2">
          <div className="flex items-center gap-2 sm:flex-col">
            <div className="rounded-full px-1.5 py-0.5 text-xs">
              {/* badge */}
              <Skeleton width={75} height={16} />
            </div>
            {/* duration */}
            <Skeleton width={75} height={16} />
          </div>
          {/* <BattleStatusText */}
          <span className="flex-1 sm:flex-grow-0">
            <Skeleton width={80} height={24} />
          </span>

          {/* replay button */}
          <Skeleton width={70} height={16} />
        </div>
        <DashedLine className="hidden sm:block" direction="vertical" />
        <DashedLine className="sm:hidden" />
        <div>
          <p className="flex items-center gap-1 pb-0 pl-4 pt-2">
            <Skeleton width={120} height={16} />
          </p>
          <TeamSkeleton width={100} />
        </div>
      </div>
    </div>
  </SkeletonTheme>
);

export const BattlesSkeleton = () => (
  <ul className="flex flex-col gap-4">
    {new Array(BATTLE_LIMIT).fill(null).map((_, index) => (
      <li key={index} className="bg-neutral-aside-dark">
        <BattleSkeleton />
      </li>
    ))}
  </ul>
);

export const SeasonSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="hsl(227 12% 15%)"
      highlightColor="hsl(227 8% 23%)"
    >
      <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-start sm:gap-0">
        <Skeleton width={104} height={28} />
        <div className="flex flex-col justify-center gap-0.5">
          <Skeleton width={80} height={16} />
          <Skeleton width={120} height={16} />
        </div>
      </div>
    </SkeletonTheme>
  );
};
