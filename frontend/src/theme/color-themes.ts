import { KANAGAWA_CODEMIRROR_THEMES } from "./codemirror";
import { KANAGAWA_SHIKI_THEMES } from "./shiki";
import type { ColorTheme, ColorThemeId } from "./types";

export const COLOR_THEMES: Record<ColorThemeId, ColorTheme> = {
  kanagawa: {
    id: "kanagawa",
    label: "Kanagawa",
    codeMirror: KANAGAWA_CODEMIRROR_THEMES,
    shiki: KANAGAWA_SHIKI_THEMES,
  },
};

export const DEFAULT_COLOR_THEME_ID: ColorThemeId = "kanagawa";
