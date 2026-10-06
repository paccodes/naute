import DOMPurify from "dompurify";
import { Lexer, type Tokens } from "marked";
import { useContext, useEffect, useMemo, useState } from "react";
import type { HighlighterCore } from "shiki";

import { ThemeContext } from "../theme";
import { createMarked, getHighlighter, loadLanguages } from "../utils";

export const useMarkdown = (content: string): string => {
  const { colorTheme, theme } = useContext(ThemeContext);

  const [highlighter, setHighlighter] = useState<HighlighterCore | null>(null);
  const [loadedLanguages, setLoadedLanguages] = useState<string[]>([]);

  const shikiThemeName = colorTheme.shiki[theme].name;

  useEffect(() => {
    let cancelled = false;

    (async function () {
      try {
        const tokens = new Lexer().lex(content);
        const languages = tokens
          .filter(
            (token): token is Tokens.Code =>
              token.type === "code" && !!token.lang,
          )
          .map((token) => token.lang!.split(/\s/)[0]);

        const newHighlighter = await getHighlighter();
        const hasNewLanguages = await loadLanguages(newHighlighter, languages);

        if (cancelled) {
          return;
        }

        setHighlighter(newHighlighter);

        if (hasNewLanguages) {
          setLoadedLanguages(newHighlighter.getLoadedLanguages());
        }
      } catch {
        void 0;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [content]);

  const html = useMemo<string>(() => {
    if (!highlighter) {
      return "";
    }

    const marked = createMarked(highlighter, shikiThemeName);

    return DOMPurify.sanitize(marked.parse(content) as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, highlighter, loadedLanguages, shikiThemeName]);

  return html;
};
