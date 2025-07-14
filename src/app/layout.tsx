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
    <html lang="en" data-theme="retrodark" data-font-scale="md">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" 
          rel="stylesheet" 
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Clean up any invalid localStorage values first
                  var savedTheme = localStorage.getItem("theme");
                  var validThemes = ["retrodark", "retrolight"];
                  if (savedTheme && validThemes.indexOf(savedTheme) === -1) {
                    localStorage.removeItem("theme");
                  }
                  
                  var savedFontScale = localStorage.getItem("fontScale");
                  var validScales = ["sm", "md"];
                  if (savedFontScale && validScales.indexOf(savedFontScale) === -1) {
                    localStorage.removeItem("fontScale");
                  }
                } catch (e) {
                  // Silent fail if localStorage is not available
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}