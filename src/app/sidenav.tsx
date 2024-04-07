import Link from "next/link";

export const Sidenav = () => (
  <aside className="sticky top-0 flex h-screen flex-col items-center justify-self-start border-r border-gray-600 bg-gray-950 p-6 text-white">
    <h1 className="text-2xl font-bold">Axie Classic</h1>
    <nav>
      <ul>
        <li>
          <Link href="/">Arena</Link>
        </li>
        {/* <li>
          <Link href="/guild">Guild</Link>
        </li> */}
      </ul>
    </nav>
  </aside>
);
