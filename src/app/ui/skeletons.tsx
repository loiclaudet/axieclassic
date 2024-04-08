import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BATTLE_LIMIT } from "~/app/lib/constant";

export const TeamSkeleton = () => (
  <div className="flex">
    {new Array(3).fill(null).map((_, i) => (
      <div
        key={i}
        className="flex h-[150px] w-[200px] items-center justify-center"
      >
        <Skeleton
          key={i}
          borderRadius={50}
          height={75}
          width={100}
          baseColor="#202020"
          highlightColor="#444"
        />
      </div>
    ))}
  </div>
);

export const BattleSkeleton = () => (
  <div className="flex flex-col items-center p-2 sm:flex-row">
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <TeamSkeleton />
      <div className="flex flex-row items-center gap-5 sm:w-28 sm:flex-col sm:gap-2">
        <Skeleton width={100} height={16} />
        <Skeleton width={50} height={18} />
        <div className="flex flex-row items-center gap-3 sm:flex-col sm:gap-0">
          <Skeleton width={80} height={12} />
          <Skeleton width={80} height={14} />
        </div>
      </div>
      <TeamSkeleton />
    </SkeletonTheme>
  </div>
);

export const BattlesSkeleton = () => (
  <ul className="flex flex-col overflow-hidden rounded-xl border border-gray-600">
    {new Array(BATTLE_LIMIT).fill(null).map((_, index) => (
      <li
        key={index}
        className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-950"}`}
      >
        <BattleSkeleton />
      </li>
    ))}
  </ul>
);
