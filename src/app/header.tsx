import { MobileMenu } from "~/components/mobile-menu";

type HeaderProps = {
  heading: React.ReactNode;
  children?: React.ReactNode;
};

export const Header = ({ heading, children }: HeaderProps) => (
  <header className="sticky top-0 z-10 flex w-full items-center justify-between self-start border-b border-b-neutral-separator-dark bg-neutral-header-dark/70 px-4 py-4 backdrop-blur-md md:hidden">
    <h1>{heading}</h1>
    {children}
    <MobileMenu />
  </header>
);
