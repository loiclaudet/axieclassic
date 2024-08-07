import Link from "next/link";
import { Button } from "~/components/ui/button";
import { LuSwords as SwordsIcon } from "react-icons/lu";

export const Sidenav = () => (
  <aside className="sticky top-0 flex h-screen w-[167px] flex-col items-stretch justify-self-start border-r border-neutral-separator-dark bg-neutral-bg-dark p-6 text-white">
    <nav>
      <ul>
        <li>
          <Button asChild size="lg" variant="link">
            <Link href="/">
              <SwordsIcon width={20} height={20} />
              Arena
            </Link>
          </Button>
        </li>
        {/* <li>
          <Link href="/guild">Guild</Link>
        </li> */}
      </ul>
    </nav>
  </aside>
);
