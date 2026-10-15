import { createContext } from "react";

import type { ColorTheme, ColorThemeId, Theme } from "./types";

export interface ThemeContextType {
  colorTheme: ColorTheme;
  theme: Theme;
  setColorTheme: (colorThemeId: ColorThemeId) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType,
);
