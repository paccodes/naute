import { type PropsWithChildren, useEffect, useState } from "react";

import { COLOR_THEMES, DEFAULT_COLOR_THEME_ID } from "./color-themes";
import { ThemeContext } from "./theme-context";
import type { Theme } from "./types";

const THEME_STORAGE_KEY = "naute_theme";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const colorTheme = COLOR_THEMES[DEFAULT_COLOR_THEME_ID];

  const [theme, setTheme] = useState<Theme>(() => {
    const persistedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (persistedTheme === "light" || persistedTheme === "dark") {
      return persistedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.colorTheme = colorTheme.id;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [colorTheme.id, theme]);

  const toggleTheme = () => {
    setTheme((previousState) => (previousState === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ colorTheme, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
