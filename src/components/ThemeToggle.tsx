import { Moon, Sun } from "lucide-react";
import type { Theme } from "../types";

type ThemeToggleProps = {
  theme: Theme;
  onToggle?: () => void;
};

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={theme === "dark" ? "light mode" : "dark mode"}
      aria-label={
        theme === "dark" ? "switch to light mode" : "switch to dark mode"
      }
      className="flex h-8 w-8 items-center justify-center border-2 border-ink bg-paper text-ink shadow-paper-sm transition-transform duration-100 hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
