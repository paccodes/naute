import type { Extension } from "@codemirror/state";
import { kanagawaLotus, kanagawaWave } from "kanagawa-codemirror-theme/src";

import type { Theme } from "../types";

export const KANAGAWA_CODEMIRROR_THEMES: Record<Theme, Extension> = {
  dark: kanagawaWave,
  light: kanagawaLotus,
};
