import { Suspense } from "react";
import Link from "next/link";
import { FaArrowLeft as ArrowLeftIcon } from "react-icons/fa6";
import { TbSwords as SwordsIcon } from "react-icons/tb";
import { Header } from "~/app/header";
import { Battles } from "~/app/profile/[clientID]/battles";
import { Profile } from "~/app/profile/[clientID]/profile";
import {
  BattlesSkeleton,
  ProfileSkeleton,
  RoninAddressSkeleton,
} from "~/components/skeletons";
import { Button } from "~/components/ui/button";
import { RoninAddress } from "~/components/ronin-address";

export const revalidate = 0;

export default function Page({ params }: { params: { clientID: string } }) {
  const { clientID } = params;

  return (
    <>
      <Header
        heading={
          <Suspense fallback={<RoninAddressSkeleton />}>
            <RoninAddress address={clientID} />
          </Suspense>
        }
      >
        <Button asChild variant="ghost" className="-order-1">
          <Link href="/" prefetch={false}>
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
        </Button>
      </Header>
      <main className="flex w-full flex-col items-center">
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile clientID={clientID} />
        </Suspense>
        <h3 className="mb-2 flex items-center gap-2">
          <SwordsIcon className="h-5 w-5" />
          Battle logs
        </h3>
        <Suspense fallback={<BattlesSkeleton />}>
          <Battles clientID={clientID} />
        </Suspense>
      </main>
    </>
  );
}
