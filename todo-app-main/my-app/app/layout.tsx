"use client";

import Image from "next/image";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import Script from "next/script";
import { ThemeProvider } from "./ThemeProvider";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const initTheme = `
    (function () {
      try {
        const saved = localStorage.getItem('theme');
        const system = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (saved === 'dark' || (!saved && system)) {
          document.documentElement.classList.add('dark');
        }
      } catch (_) {}
    })();
  `;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="init-theme" strategy="beforeInteractive">
          {initTheme}
        </Script>
      </head>
      <ThemeProvider>
        <body className={`${josefinSans.variable} antialiased h-screen`}>
          <div className="px-6 py-8 flex justify-between items-center">
            <span className="text-2xl font-bold tracking-[0.5rem] text-white">
              TODO
            </span>
            <ThemeIcon />
          </div>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}

const ThemeIcon = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <>
      {isDark && (
        <Image
          src={`/images/icon-sun.svg`}
          alt="sun"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={() => setIsDark(false)}
        />
      )}

      {!isDark && (
        <Image
          src={`/images/icon-moon.svg`}
          alt="moon"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={() => setIsDark(true)}
        />
      )}
    </>
  );
};
