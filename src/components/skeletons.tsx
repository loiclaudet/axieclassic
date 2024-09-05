import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BATTLE_LIMIT } from "~/lib/constant";

type TeamSkeletonProps = {
  width?: number;
};

export const TeamSkeleton = ({ width }: TeamSkeletonProps) => (
  <div className="flex gap-6 p-4">
    {new Array(3).fill(null).map((_, i) => (
      <div key={i} className="flex items-center justify-center">
        <div className="hidden md:block">
          <Skeleton
            borderRadius={12}
            width={width ?? 110}
            height={width ? width * 0.75 : 95}
            baseColor="hsl(227 12% 15%)"
            highlightColor="hsl(227 8% 23%)"
          />
        </div>
        <div className="md:hidden">
          <Skeleton
            borderRadius={12}
            width={width ?? 80}
            height={width ? width * 0.75 : 69}
            baseColor="hsl(227 12% 15%)"
            highlightColor="hsl(227 8% 23%)"
          />
        </div>
      </div>
    ))}
  </div>
);

export const ProfileRankSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="hsl(227 12% 15%)"
      highlightColor="hsl(227 8% 23%)"
    >
      <section className="flex items-center justify-around gap-3 self-stretch bg-neutral-aside-dark p-3 md:flex-1 md:basis-1/2 md:bg-neutral-aside-dark/70 md:backdrop-blur-md">
        <div className="flex flex-col items-center justify-center">
          <Skeleton width={100} height={16} />
          <Skeleton width={100} height={16} />
        </div>
        <div className="flex items-center justify-center">
          <Skeleton width={100} height={100} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Skeleton width={100} height={16} />
          <Skeleton width={100} height={16} />
        </div>
      </section>
    </SkeletonTheme>
  );
};

export const ProfileSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="hsl(227 12% 15%)"
      highlightColor="hsl(227 8% 23%)"
    >
      <section className="mb-6 flex flex-col items-center justify-center gap-3 self-stretch border-b border-b-neutral-separator-dark bg-neutral-aside-dark p-3 md:sticky md:top-0 md:z-10 md:bg-neutral-aside-dark/70 md:backdrop-blur-md">
        <div className="flex flex-col items-center">
          <h2 className="max-w-96 text-center text-2xl font-bold text-neutral-100">
            <Skeleton width={200} height={32} />
          </h2>
          <div className="hidden md:block">
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
      <div className="flex flex-col md:flex-row">
        <div>
          <p className="pl-4 pt-2">
            <Skeleton width={120} height={16} />
          </p>
          <TeamSkeleton width={120} />
        </div>
        <div className="flex items-center justify-center px-4 py-1 md:flex-col md:gap-2 md:p-2">
          <div className="flex items-center gap-2 md:flex-col">
            <div className="rounded-full px-1.5 py-0.5 text-xs">
              {/* badge */}
              <Skeleton width={75} height={16} />
            </div>
            {/* duration */}
            <Skeleton width={75} height={16} />
          </div>
          {/* <BattleStatusText */}
          <span className="flex-1 md:flex-grow-0">
            <Skeleton width={80} height={24} />
          </span>

          {/* replay button */}
          <Skeleton width={70} height={16} />
        </div>
        <div>
          <p className="flex items-center gap-1 pb-0 pl-4 pt-2">
            <Skeleton width={120} height={16} />
          </p>
          <TeamSkeleton width={120} />
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
      <div className="flex shrink-0 items-center gap-4 md:flex-col md:items-start md:gap-0">
        <Skeleton width={104} height={28} />
        <div className="flex flex-col justify-center gap-0.5">
          <Skeleton width={80} height={16} />
          <Skeleton width={120} height={16} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export const RoninAddressSkeleton = ({ size = 14 }: { size?: number }) => (
  <div
    className="flex items-center gap-1"
    style={{
      fontSize: `${size}px`,
    }}
  >
    <Skeleton
      width={120}
      height={size}
      baseColor="hsl(227 12% 15%)"
      highlightColor="hsl(227 8% 23%)"
    />
  </div>
);

export const FindSimilarSkeleton = () => (
  <SkeletonTheme baseColor="hsl(227 12% 15%)" highlightColor="hsl(227 8% 23%)">
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 md:min-h-[330px]">
      <div className="flex flex-col items-center">
        <Skeleton width={200} height={32} />
        <div className="flex items-center gap-1">
          <Skeleton width={120} height={16} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <Skeleton width={150} height={112} />
        <div className="flex flex-col gap-2">
          <Skeleton width={120} height={20} />
          <div className="grid grid-cols-2 gap-4">
            {new Array(4).fill(null).map((_, i) => (
              <Skeleton key={i} width={50} height={20} />
            ))}
          </div>
        </div>
      </div>
      <Skeleton width={200} height={32} />
    </div>
  </SkeletonTheme>
);

export const GuildRewardSkeleton = () => (
  <SkeletonTheme baseColor="hsl(227 12% 15%)" highlightColor="hsl(227 8% 23%)">
    <div className="flex items-baseline gap-1">
      <Skeleton width={24} height={24} />
      <Skeleton width={100} height={20} />
    </div>
  </SkeletonTheme>
);
