import { useContext, useEffect, useRef, useState } from "react";

import { COLOR_THEMES, type ColorTheme, ThemeContext } from "../theme";
import { cn } from "../utils";

const COLOR_THEME_OPTIONS = Object.values(COLOR_THEMES);

export const ColorThemeMenu = () => {
  const { colorTheme, setColorTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsOpen((previousState) => !previousState);
  };

  const handleOptionSelectFactory = (option: ColorTheme) => () => {
    setColorTheme(option.id);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={handleMenuToggle}
        className={cn(
          "flex size-9 items-center justify-center",
          "rounded-lg transition-colors",
          "bg-accent/15 text-accent hover:bg-accent/25",
        )}
        title="Change color theme"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <span className="material-icons-outlined text-xl">palette</span>
      </button>
      {isOpen && (
        <ul
          role="menu"
          className={cn(
            "absolute right-0 top-full z-10 mt-1",
            "min-w-36 overflow-hidden rounded-lg border",
            "border-edge bg-panel shadow-elevated",
          )}
        >
          {COLOR_THEME_OPTIONS.map((option) => {
            const isActive = colorTheme.id === option.id;

            return (
              <li key={option.id}>
                <button
                  role="menuitemradio"
                  aria-checked={isActive}
                  onClick={handleOptionSelectFactory(option)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3",
                    "px-3.5 py-2.5 text-left text-sm transition-colors",
                    "hover:bg-active hover:text-active-fg",
                    isActive
                      ? "bg-accent/15 text-accent font-medium"
                      : "text-ink-dim",
                  )}
                >
                  <span>{option.label}</span>
                  {isActive && (
                    <span className="material-icons-outlined text-base">
                      check
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
