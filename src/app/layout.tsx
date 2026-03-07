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
    description: "See where crypto dollars flow around the world. Live data from 500+ exchanges across 80+ countries.",
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
      <head>
        {/* Inline critical CSS so the loading screen renders before any JS downloads */}
        <style dangerouslySetInnerHTML={{ __html: `
          #html-loader{position:fixed;inset:0;z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#030308}
          #html-loader .pulse{width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(0,245,255,0.4) 0%,transparent 70%);animation:lp 2s ease-in-out infinite}
          #html-loader .dot{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:16px;height:16px;border-radius:50%;background:#00F5FF;box-shadow:0 0 10px #00F5FF,0 0 20px rgba(0,245,255,0.5)}
          #html-loader h1{margin-top:32px;font-size:clamp(1.25rem,4vw,2rem);font-weight:700;letter-spacing:0.3em;color:#E0E0FF;font-family:var(--font-geist-mono),monospace;text-shadow:0 0 20px rgba(0,245,255,0.5)}
          #html-loader p{margin-top:12px;font-size:0.85rem;letter-spacing:0.15em;color:#7070AA;font-family:var(--font-geist-mono),monospace}
          @keyframes lp{0%,100%{transform:scale(1);opacity:0.5}50%{transform:scale(1.5);opacity:0.8}}
        `}} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Server-rendered loading screen — visible instantly before JS downloads.
            Only shows on the home page (globe). Hidden once React hydrates via LoadingScreen. */}
        <div id="html-loader" aria-hidden="true">
          <div style={{ position: 'relative' }}>
            <div className="pulse" />
            <div className="dot" />
          </div>
          <h1>STABLECOIN PULSE</h1>
          <p>Mapping global stablecoin flows...</p>
        </div>
        <script dangerouslySetInnerHTML={{ __html: `
          // Hide HTML loader immediately on non-home routes (they are server-rendered)
          if(location.pathname!=='/') document.getElementById('html-loader').style.display='none';
        `}} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
