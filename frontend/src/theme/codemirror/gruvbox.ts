import type { Extension } from "@codemirror/state";
import { gruvboxDark, gruvboxLight } from "gruvbox-codemirror-theme/src";

import type { Theme } from "../types";

export const GRUVBOX_CODEMIRROR_THEMES: Record<Theme, Extension> = {
  dark: gruvboxDark,
  light: gruvboxLight,
};
