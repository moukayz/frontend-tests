import { createContext } from "react";

export const ThemeContext = createContext<{
  isDark: boolean | undefined;
  setIsDark: (isDark: boolean) => void;
}>({
  isDark: true,
  setIsDark: () => {},
});
