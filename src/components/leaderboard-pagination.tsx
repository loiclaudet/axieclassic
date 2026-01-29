import Link from "next/link";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function LeaderboardPagination({
  currentPage,
}: {
  currentPage: 1 | 2;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="default"
        size="sm"
        asChild
        className={cn(
          "text-xs md:text-sm",
          currentPage === 1 && "text-neutral-100 border-neutral-400",
        )}
      >
        <Link href="/">Top 50</Link>
      </Button>
      <Button
        variant="default"
        size="sm"
        asChild
        className={cn(
          "text-xs md:text-sm",
          currentPage === 2 && "text-neutral-100 border-neutral-400",
        )}
      >
        <Link href="/?page=2">Top 100</Link>
      </Button>
    </div>
  );
}
