import type { ShikiTheme, Theme } from "../types";

export const GRUVBOX_SHIKI_THEMES: Record<Theme, ShikiTheme> = {
  dark: {
    name: "gruvbox-dark-medium",
    load: () => import("shiki/themes/gruvbox-dark-medium.mjs"),
  },
  light: {
    name: "gruvbox-light-medium",
    load: () => import("shiki/themes/gruvbox-light-medium.mjs"),
  },
};
