import {
  GRUVBOX_CODEMIRROR_THEMES,
  KANAGAWA_CODEMIRROR_THEMES,
} from "./codemirror";
import { GRUVBOX_SHIKI_THEMES, KANAGAWA_SHIKI_THEMES } from "./shiki";
import type { ColorTheme, ColorThemeId } from "./types";

export const COLOR_THEMES: Record<ColorThemeId, ColorTheme> = {
  kanagawa: {
    id: "kanagawa",
    label: "Kanagawa",
    codeMirror: KANAGAWA_CODEMIRROR_THEMES,
    shiki: KANAGAWA_SHIKI_THEMES,
  },
  gruvbox: {
    id: "gruvbox",
    label: "Gruvbox",
    codeMirror: GRUVBOX_CODEMIRROR_THEMES,
    shiki: GRUVBOX_SHIKI_THEMES,
  },
};

export const DEFAULT_COLOR_THEME_ID: ColorThemeId = "kanagawa";

export const isColorThemeId = (value: string | null): value is ColorThemeId =>
  value !== null && Object.hasOwn(COLOR_THEMES, value);
