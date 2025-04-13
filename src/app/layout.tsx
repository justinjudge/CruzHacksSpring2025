// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PostingProvider } from "./context/PostingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Here’s your updated metadata
export const metadata: Metadata = {
  title: "CruzConnect",
  description: "Where Santa Cruz comes together — rideshare, tutoring more.",
  icons: {
    icon: "/images/SlugWebLogo.png", // path to your favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PostingProvider>
            {children}
        </PostingProvider>
      </body>
    </html>
  );
}
