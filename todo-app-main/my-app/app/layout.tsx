"use client";

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const getStorageTheme = () => {
  if (typeof window === "undefined") {
    return undefined;
  }
  try {
    return localStorage.getItem("theme");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return null;
  }
};

const getSystemTheme = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const readTheme = () => {
  const saved = getStorageTheme();
  if (saved === undefined) {
    return undefined;
  }

  if (saved === null) {
    const system = getSystemTheme();
    return system;
  } else {
    return saved === "dark";
  }
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Start with undefined to match server-side rendering
  const [isDark, setIsDark] = useState<boolean | undefined>(undefined);
  const [isHydrated, setIsHydrated] = useState(false);

  // Only read theme after hydration to avoid mismatch
  useEffect(() => {
    setIsHydrated(true);
    const theme = readTheme();
    setIsDark(theme ?? false); // Default to false if no theme found
  }, []);

  useEffect(() => {
    if (!isHydrated || isDark === undefined) {
      return;
    }
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.theme = isDark ? "dark" : "light";
  }, [isDark, isHydrated]);

  const setIsDarkOut = useCallback((isDark: boolean) => {
    setIsDark(isDark);
  }, []);

  const themeContextValue = useMemo(
    () => ({ isDark, setIsDark: setIsDarkOut }),
    [isDark, setIsDarkOut]
  );

  return <ThemeContext value={themeContextValue}>{children}</ThemeContext>;
};

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
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
        >
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
