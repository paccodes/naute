import type { Extension } from "@codemirror/state";
import type { ThemeInput } from "shiki";

export type Theme = "light" | "dark";

export type ColorThemeId = "kanagawa";

export interface ShikiTheme {
  name: string;
  load: ThemeInput;
}

export interface ColorTheme {
  id: ColorThemeId;
  label: string;
  codeMirror: Record<Theme, Extension>;
  shiki: Record<Theme, ShikiTheme>;
}
