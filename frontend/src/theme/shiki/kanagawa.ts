import type { ShikiTheme, Theme } from "../types";

export const KANAGAWA_SHIKI_THEMES: Record<Theme, ShikiTheme> = {
  dark: {
    name: "kanagawa-wave",
    load: () => import("shiki/themes/kanagawa-wave.mjs"),
  },
  light: {
    name: "kanagawa-lotus",
    load: () => import("shiki/themes/kanagawa-lotus.mjs"),
  },
};
