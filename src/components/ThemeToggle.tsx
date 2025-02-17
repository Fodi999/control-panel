"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-800 rounded-md"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
