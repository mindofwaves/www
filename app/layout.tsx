import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WAVE$",
  description: "Games & Heartbreaks",
  themeColor: '#000000'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overscroll-none bg-black">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} bg-black overscroll-none`}>
        {children}
      </body>
    </html>
  );
}
