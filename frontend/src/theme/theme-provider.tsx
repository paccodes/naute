import { type PropsWithChildren, useEffect, useState } from "react";

import {
  COLOR_THEMES,
  DEFAULT_COLOR_THEME_ID,
  isColorThemeId,
} from "./color-themes";
import { ThemeContext } from "./theme-context";
import type { ColorThemeId, Theme } from "./types";

const THEME_STORAGE_KEY = "naute_theme";
const COLOR_THEME_STORAGE_KEY = "naute_color_theme";

const getPersistedColorThemeId = (): ColorThemeId => {
  const persistedColorThemeId = localStorage.getItem(COLOR_THEME_STORAGE_KEY);

  return isColorThemeId(persistedColorThemeId)
    ? persistedColorThemeId
    : DEFAULT_COLOR_THEME_ID;
};

const getPersistedTheme = (): Theme => {
  const persistedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (persistedTheme === "light" || persistedTheme === "dark") {
    return persistedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [colorThemeId, setColorThemeId] = useState<ColorThemeId>(
    getPersistedColorThemeId,
  );
  const [theme, setTheme] = useState<Theme>(getPersistedTheme);

  const colorTheme = COLOR_THEMES[colorThemeId];

  useEffect(() => {
    document.documentElement.dataset.colorTheme = colorThemeId;

    localStorage.setItem(COLOR_THEME_STORAGE_KEY, colorThemeId);
  }, [colorThemeId]);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((previousState) => (previousState === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        colorTheme,
        theme,
        setColorTheme: setColorThemeId,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
