import "~/styles/globals.css";

import dynamic from "next/dynamic";
import type { Viewport } from "next";
import { Work_Sans } from "next/font/google";
import { Sidenav } from "./sidenav";
import { PHProvider } from "./providers";
import { TopBanner } from "~/components/top-banner";
import { LiveChampionShip } from "~/components/live-championship";

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: "Axie Classic",
  description: "Axie classic leaderboards and stats",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <PHProvider>
        <body
          className={`relative flex min-h-dvh w-full justify-center font-sans tracking-tight ${workSans.variable} overscroll-y-none bg-neutral-bg-dark text-neutral-400`}
        >
          <TopBanner className="bg-mystic-600/90 text-neutral-100">
            <LiveChampionShip />
          </TopBanner>

          <PostHogPageView />
          <div className="flex w-full max-w-screen-xl flex-col md:w-auto md:flex-row md:border-r md:border-r-neutral-separator-dark">
            <Sidenav />
            {children}
          </div>
          {modal}
        </body>
      </PHProvider>
    </html>
  );
}
