import "~/styles/globals.css";

import dynamic from "next/dynamic";
import { Work_Sans } from "next/font/google";
import { Sidenav } from "./sidenav";
import { PHProvider } from "./providers";

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Axie Classic",
  description: "Axie classic leaderboards and stats",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <PHProvider>
        <body
          className={`flex justify-center font-sans tracking-tight ${workSans.variable} overscroll-y-none bg-neutral-bg-dark text-neutral-400`}
        >
          <PostHogPageView />
          <div className="flex max-w-screen-lg">
            <Sidenav />
            {children}
          </div>
        </body>
      </PHProvider>
    </html>
  );
}
