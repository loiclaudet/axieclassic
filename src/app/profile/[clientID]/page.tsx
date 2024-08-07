import { Suspense } from "react";
import Image from "next/image";
import { Header } from "~/app/header";
import { Battles } from "~/app/profile/[clientID]/battles";
import { Search } from "~/app/ui/search";
import { BattlesSkeleton } from "~/app/ui/skeletons";
import { FaArrowLeft as ArrowLeftIcon } from "react-icons/fa6";
import { shortenHash } from "~/app/lib/utils";
import { CopyButton } from "~/app/ui/copy";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export const revalidate = 0;

export default function Page({ params }: { params: { clientID: string } }) {
  const { clientID } = params;
  return (
    <>
      <Header
        heading={
          <div className="flex items-center gap-1">
            <Image src={`/ronin.svg`} width={14} height={14} alt="ronin" />
            <span>{shortenHash(clientID)}</span>
            <CopyButton text={clientID} />
          </div>
        }
      >
        <Button asChild variant="ghost" className="-order-1">
          <Link href="/">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
        </Button>
      </Header>
      <main className="flex flex-col items-center gap-4 py-4">
        <Search />
        <Suspense fallback={<BattlesSkeleton />}>
          <Battles clientID={clientID} />
        </Suspense>
      </main>
    </>
  );
}
