import { LuMenu as MenuIcon } from "react-icons/lu";

type HeaderProps = {
  heading: React.ReactNode;
  children?: React.ReactNode;
};

export const Header = ({ heading, children }: HeaderProps) => (
  <header className="sticky top-0 z-10 flex w-full items-center justify-between self-start border-b border-b-neutral-separator-dark bg-neutral-header-dark/80 px-4 py-4 backdrop-blur-md sm:hidden">
    <h1>{heading}</h1>
    {children}
    {/* // TODO: make menu icon visible */}
    <MenuIcon className="invisible h-6 w-6 text-neutral-icon-dark" />
  </header>
);
