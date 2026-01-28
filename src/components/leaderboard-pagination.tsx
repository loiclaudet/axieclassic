import Link from "next/link";
import { cn } from "~/lib/utils";

export function LeaderboardPagination({
  currentPage,
}: {
  currentPage: 1 | 2;
}) {
  return (
    <div className="flex items-center gap-1">
      <Link
        href="/"
        className={cn(
          "rounded-md px-2.5 py-1 text-sm font-medium transition-colors hover:text-neutral-100",
          currentPage === 1
            ? "text-neutral-100"
            : "text-neutral-icon-dark",
        )}
      >
        Top 50
      </Link>
      <Link
        href="/?page=2"
        className={cn(
          "rounded-md px-2.5 py-1 text-sm font-medium transition-colors hover:text-neutral-100",
          currentPage === 2
            ? "text-neutral-100"
            : "text-neutral-icon-dark",
        )}
      >
        Top 100
      </Link>
    </div>
  );
}
