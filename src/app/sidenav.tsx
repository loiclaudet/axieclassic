import Link from "next/link";
import { Button } from "~/components/ui/button";
import { TbSwords as SwordsIcon } from "react-icons/tb";

export const Sidenav = () => (
  <aside className="sticky top-0 hidden h-screen w-[167px] flex-col items-stretch justify-self-start border-r border-neutral-separator-dark bg-neutral-bg-dark p-4 text-white md:flex">
    <nav>
      <ul>
        <li key="arena">
          <Button asChild size="lg" variant="link" className="w-full">
            <Link href="/">
              <SwordsIcon className="h-5 w-5" />
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
