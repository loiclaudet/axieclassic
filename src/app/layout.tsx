import { Analytics } from "@vercel/analytics/react";
import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { Sidenav } from "./sidenav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
        className={`font-sans ${inter.variable} grid grid-cols-[1fr_auto_1fr] overscroll-y-none bg-gray-950 text-[#A0A0A0]`}
      >
        <Sidenav />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
