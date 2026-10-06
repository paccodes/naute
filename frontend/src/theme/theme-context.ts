import { createContext } from "react";

import type { ColorTheme, Theme } from "./types";

export interface ThemeContextType {
  colorTheme: ColorTheme;
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType,
);
