import { Marked } from "marked";
import {
  bundledLanguages,
  createHighlighterCore,
  createJavaScriptRegexEngine,
  type HighlighterCore,
} from "shiki";

import { COLOR_THEMES } from "../theme";

let highlighterPromise: Promise<HighlighterCore> | null = null;

export const createMarked = (
  highlighter: HighlighterCore,
  shikiTheme: string,
): Marked => {
  return new Marked({
    renderer: {
      code({ text, lang }) {
        const language =
          lang && highlighter.getLoadedLanguages().includes(lang)
            ? lang
            : "text";

        return highlighter.codeToHtml(text, {
          lang: language,
          theme: shikiTheme,
        });
      },
    },
  });
};

export const getHighlighter = (): Promise<HighlighterCore> => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      engine: createJavaScriptRegexEngine(),
      langs: [],
      themes: Object.values(COLOR_THEMES).flatMap((colorTheme) =>
        Object.values(colorTheme.shiki).map((shikiTheme) => shikiTheme.load),
      ),
    });
  }

  return highlighterPromise;
};

export const loadLanguages = async (
  highlighter: HighlighterCore,
  languages: string[],
): Promise<boolean> => {
  const loadedLanguages = new Set(highlighter.getLoadedLanguages());
  const missingLanguages = languages.filter(
    (language) =>
      !loadedLanguages.has(language) && language in bundledLanguages,
  );

  if (missingLanguages.length > 0) {
    await highlighter.loadLanguage(
      ...missingLanguages.map(
        (language) =>
          bundledLanguages[language as keyof typeof bundledLanguages],
      ),
    );

    return true;
  }

  return false;
};
