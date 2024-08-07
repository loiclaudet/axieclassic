import { LuMenu as MenuIcon } from "react-icons/lu";

type HeaderProps = {
  heading: React.ReactNode;
  children?: React.ReactNode;
};

export const Header = ({ heading, children }: HeaderProps) => (
  <header className="top-0 z-10 flex w-full items-center justify-between border-b border-b-neutral-separator-dark px-4 py-4 sm:sticky sm:hidden">
    <h1>{heading}</h1>
    {children}
    <MenuIcon className="h-6 w-6 text-neutral-100" />
  </header>
);
