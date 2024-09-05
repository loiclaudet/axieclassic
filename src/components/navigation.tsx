"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { TbSwords as SwordsIcon } from "react-icons/tb";
import { LuBookOpenCheck as BookOpenCheckIcon } from "react-icons/lu";
import { GiSwordsEmblem as GuildIcon } from "react-icons/gi";

import { cn } from "~/lib/utils";

type NavigationProps = {
  onNavigate?: () => void;
  centered?: boolean;
  buttonSize?: "lg" | "xl";
};

export const Navigation = ({
  onNavigate,
  centered = false,
  buttonSize = "lg",
}: NavigationProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(centered && "flex flex-col items-center justify-center")}
    >
      <ul
        className={cn("flex flex-col gap-2", centered && "items-center gap-4")}
      >
        <li key="arena">
          <Button
            asChild
            size={buttonSize}
            variant="link"
            className="w-full"
            onClick={onNavigate}
          >
            <Link href="/" prefetch={false}>
              <SwordsIcon
                className={cn(
                  getButtonClassNameBySize(buttonSize),
                  pathname === "/" && "text-neutral-100",
                )}
              />
              <span className={cn(pathname === "/" && "text-neutral-100")}>
                Arena
              </span>
            </Link>
          </Button>
        </li>
        <li key="guilds">
          <Button
            asChild
            size={buttonSize}
            variant="link"
            className="w-full"
            onClick={onNavigate}
          >
            <Link href="/guilds" prefetch={false}>
              <GuildIcon
                className={cn(
                  getButtonClassNameBySize(buttonSize),
                  pathname === "/guilds" && "text-neutral-100",
                )}
              />
              <span
                className={cn(pathname === "/guilds" && "text-neutral-100")}
              >
                Guilds
              </span>
            </Link>
          </Button>
        </li>
        <li key="learn">
          <Button
            asChild
            size={buttonSize}
            variant="link"
            className="w-full"
            onClick={onNavigate}
          >
            <a
              className="text-neutral-icon-dark"
              href="https://skymavis.notion.site/Axie-Infinity-Classic-Guides-1e1e5bd1dc564dbb933cab911717f656"
              target="_blank"
              rel="noreferrer"
            >
              <BookOpenCheckIcon
                className={getButtonClassNameBySize(buttonSize)}
              />
              <span>Learn</span>
            </a>
          </Button>
        </li>
      </ul>
    </nav>
  );
};

function getButtonClassNameBySize(size: "lg" | "xl") {
  switch (size) {
    case "lg":
      return "h-5 w-5";
    case "xl":
      return "h-8 w-8";
    default:
      return "h-5 w-5";
  }
}
