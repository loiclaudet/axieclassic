import Link from "next/link";
import { FaArrowLeft as ArrowLeftIcon } from "react-icons/fa6";
import { TbSwords as SwordsIcon } from "react-icons/tb";
import { Header } from "~/app/header";
import {
  BattlesSkeleton,
  ProfileRankSkeleton,
  ProfileSkeleton,
  RoninAddressSkeleton,
} from "~/components/skeletons";
import { Button } from "~/components/ui/button";

export default function Loading() {
  return (
    <>
      <Header heading={<RoninAddressSkeleton />}>
        <Button asChild variant="ghost" className="-order-1">
          <Link href="/" prefetch={false}>
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
        </Button>
      </Header>
      <main className="flex w-full flex-col items-center border-r border-r-neutral-separator-dark md:w-auto lg:w-[987px]">
        <div className="mb-6 flex w-full flex-col border-b border-b-neutral-separator-dark md:sticky md:top-0 md:z-10 md:flex-row">
          <ProfileSkeleton />
          <ProfileRankSkeleton />
        </div>
        <h3 className="mb-2 flex items-center gap-2">
          <SwordsIcon className="h-5 w-5" />
          Battle logs
        </h3>
        <BattlesSkeleton />
      </main>
    </>
  );
}
