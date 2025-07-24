"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const commonClasses =
    "w-9 h-9 p-0 border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center rounded-md";

  if (!mounted) {
    return (
      <button className={commonClasses}>
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button onClick={toggleTheme} className={commonClasses}>
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
