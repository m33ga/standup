import { Moon, Sun } from "lucide-react";
import { useStore } from "../store";

export function ThemeToggle() {
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);

  return (
    <button
      type="button"
      onClick={toggleTheme}
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
