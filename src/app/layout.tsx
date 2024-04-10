import { Analytics } from "@vercel/analytics/react";
import "~/styles/globals.css";

import { Work_Sans } from "next/font/google";
import { Sidenav } from "./sidenav";

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
      <body
        className={`font-sans tracking-tight ${inter.variable} spac overscroll-y-none  bg-gray-950 text-[#A0A0A0] lg:grid lg:grid-cols-[1fr_auto_1fr]`}
      >
        <Sidenav />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
