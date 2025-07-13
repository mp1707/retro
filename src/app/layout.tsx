import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Retro - Retrospective Tool",
  description: "A pixel-perfect retrospective tool for agile teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" 
          rel="stylesheet" 
        />
        <style>{`
          :root {
            --gradient-primary: linear-gradient(90deg, #FFD166 0%, #F79F79 50%, #F786A3 100%);
            --gradient-secondary: linear-gradient(90deg, #F79F79 0%, #D497E8 50%, #A29BFE 100%);
            --gradient-tertiary: linear-gradient(90deg, #97CC04 0%, #5DDAA4 50%, #46B2E8 100%);
            --text-default: #EAEAEA;
            --text-muted: #A0A0A0;
            --divider: #666666;
          }
        `}</style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: '#1A1A1A',
          fontFamily: "'Pixel Operator', 'Press Start 2P', 'Silkscreen', 'VT323', monospace",
          color: '#EAEAEA',
          minHeight: '100vh'
        }}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
