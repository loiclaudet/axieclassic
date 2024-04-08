import Link from "next/link";

export const Sidenav = () => (
  <aside className="flex flex-col items-center border-gray-600 bg-gray-950 p-6 text-white lg:sticky lg:top-0 lg:h-screen lg:items-start lg:justify-self-start lg:border-r">
    <h1 className="text-2xl font-bold">Axie Classic</h1>
    <nav>
      <ul>
        <li>
          <Link className="underline" href="/">
            Arena
          </Link>
        </li>
        {/* <li>
          <Link href="/guild">Guild</Link>
        </li> */}
      </ul>
    </nav>
  </aside>
);
