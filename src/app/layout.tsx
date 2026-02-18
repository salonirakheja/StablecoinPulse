import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://stablecoinpulse.com"),
  title: "Stablecoin Pulse — Global Volume Heatmap",
  description:
    "Real-time 3D globe showing global stablecoin trading volume by country. Live data from 500+ exchanges and 6 blockchains.",
  keywords: ["stablecoin", "USDT", "USDC", "crypto volume", "heatmap", "globe", "trading volume", "DeFi"],
  openGraph: {
    title: "Stablecoin Pulse — Global Volume Heatmap",
    description: "See where crypto dollars flow around the world. Live data from 500+ exchanges across 45+ countries.",
    type: "website",
    siteName: "Stablecoin Pulse",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stablecoin Pulse — Where Crypto Dollars Flow",
    description: "Real-time 3D globe of global stablecoin volume. Live data from 500+ exchanges and 6 blockchains.",
    creator: "@salonirakheja",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
