"use client";

import { createContext, useContext } from "react";

type Theme = "dark";

interface ThemeContextValue {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
});

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <ThemeContext.Provider value={{ theme: "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
