"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ThemeContext } from "./ThemeContext";

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
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
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
