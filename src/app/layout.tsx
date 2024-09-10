import "~/styles/globals.css";

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import type { Viewport } from "next";
import { Work_Sans } from "next/font/google";
import { PHProvider } from "./providers";
import { Navigation } from "~/components/navigation";
import { ContactAndSupport } from "~/components/contact-and-support";
import { Toaster } from "~/components/ui/sonner";

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
};

export const metadata: Metadata = {
  metadataBase: new URL("https://axieclassic.com"),
  title: "Axie Classic",
  description: "Axie classic leaderboards and stats",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  authors: [
    {
      name: "0xlodz",
      url: "https://x.com/0xlodz",
    },
  ],
  openGraph: {
    title: "Axie Classic",
    description: "Axie classic leaderboards and stats.",
    images: [
      {
        url: "/opengraph-axie-classic.png",
        width: 100,
        height: 100,
        alt: "about axie classic",
      },
    ],
  },
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
          <PostHogPageView />
          <div className="flex w-full max-w-screen-xl flex-col md:w-auto md:flex-row">
            <aside className="sticky top-0 hidden h-screen flex-col items-stretch justify-between justify-self-start border-r border-neutral-separator-dark bg-neutral-bg-dark p-4 text-white md:flex">
              <Navigation />
              <ContactAndSupport />
            </aside>
            {children}
          </div>
          {modal}
          <Toaster position="bottom-center" />
        </body>
      </PHProvider>
    </html>
  );
}
