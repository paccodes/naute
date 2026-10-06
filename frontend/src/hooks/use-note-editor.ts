import { markdown as cmMarkdown } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { Compartment } from "@codemirror/state";
import { basicSetup, EditorView } from "codemirror";
import { type RefObject, useContext, useEffect, useRef, useState } from "react";

import { ThemeContext } from "../theme";

import { useMarkdown } from "./use-markdown";

const themeCompartment = new Compartment();

interface Params {
  initialContent: string;
  onContentChange: () => void;
}

interface ReturnValue {
  content: string;
  editorRef: RefObject<HTMLDivElement | null>;
  previewHtml: string;
}

export const useNoteEditor = ({
  initialContent,
  onContentChange,
}: Params): ReturnValue => {
  const { colorTheme, theme } = useContext(ThemeContext);

  const [content, setContent] = useState<string>(initialContent);

  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const contentRef = useRef<string>(content);
  const onContentChangeRef = useRef<typeof onContentChange>(onContentChange);

  const codeMirrorTheme = colorTheme.codeMirror[theme];

  contentRef.current = content;
  onContentChangeRef.current = onContentChange;

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    const view = new EditorView({
      doc: contentRef.current,
      extensions: [
        basicSetup,
        cmMarkdown({ codeLanguages: languages }),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const newContent = update.state.doc.toString();

            contentRef.current = newContent;
            setContent(newContent);
            onContentChangeRef.current();
          }
        }),
        themeCompartment.of(codeMirrorTheme),
      ],
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [codeMirrorTheme]);

  useEffect(() => {
    if (!viewRef.current) {
      return;
    }

    viewRef.current.dispatch({
      effects: themeCompartment.reconfigure(codeMirrorTheme),
    });
  }, [codeMirrorTheme]);

  useEffect(() => {
    setContent(initialContent);

    contentRef.current = initialContent;

    if (viewRef.current) {
      const view = viewRef.current;
      const currentDoc = view.state.doc.toString();

      if (currentDoc !== initialContent) {
        view.dispatch({
          changes: {
            from: 0,
            to: currentDoc.length,
            insert: initialContent,
          },
        });
      }
    }
  }, [initialContent]);

  const previewHtml = useMarkdown(content);

  return {
    content,
    editorRef,
    previewHtml,
  };
};
