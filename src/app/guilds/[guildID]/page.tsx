import { Suspense } from "react";
import Link from "next/link";
import { Guild } from "./guild";
import { Header } from "~/app/header";
import { Button } from "~/components/ui/button";
import { FaArrowLeft as ArrowLeftIcon } from "react-icons/fa6";

type GuildPageProps = {
  params: { guildID: string };
};

export default function GuildPage({ params }: GuildPageProps) {
  const guildId = params.guildID;

  return (
    <>
      <Header heading={null}>
        <Button asChild variant="ghost" className="-order-1">
          <Link href="/guilds" prefetch={false}>
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
        </Button>
      </Header>
      <main className="flex w-full flex-col items-center md:w-auto md:border-r md:border-r-neutral-separator-dark">
        <Suspense
          fallback={
            <div className="flex h-dvh items-center justify-center md:min-w-[768px]">
              Loading...
            </div>
          }
        >
          <Guild id={guildId} />
        </Suspense>
      </main>
    </>
  );
}
