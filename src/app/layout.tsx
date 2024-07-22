import "~/styles/globals.css";

import dynamic from "next/dynamic";
import { Work_Sans } from "next/font/google";
import { Sidenav } from "./sidenav";
import { PHProvider } from "./providers";

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
});

const inter = Work_Sans({
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
          className={`font-sans tracking-tight ${inter.variable} overscroll-y-none  bg-gray-950 text-[#A0A0A0] lg:grid lg:grid-cols-[1fr_auto_1fr]`}
        >
          <PostHogPageView />
          <Sidenav />
          {children}
        </body>
      </PHProvider>
    </html>
  );
}
