"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Варианты анимации для кнопки
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  // Варианты анимации для иконки
  const iconVariants = {
    light: { rotate: 0, opacity: 1, transition: { duration: 0.3 } },
    dark: { rotate: 180, opacity: 1, transition: { duration: 0.3 } },
    hidden: { opacity: 0 },
  };

  return (
    <motion.button
      initial="hidden"
      animate="visible"
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={toggleTheme}
      className="flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-100 rounded-xl shadow-md hover:shadow-lg transition-all"
    >
      <motion.div
        key={theme} // Обновление анимации при смене темы
        initial="hidden"
        animate={theme === "light" ? "light" : "dark"}
        variants={iconVariants}
        className="flex items-center"
      >
        {theme === "light" ? (
          <Sun className="h-3 w-3 sm:h-4 sm:w-4" />
        ) : (
          <Moon className="h-3 w-3 sm:h-4 sm:w-4" />
        )}
      </motion.div>
      <span className="text-xs sm:text-sm font-medium">
        {theme === "light" ? "Темная" : "Светлая"}
      </span>
    </motion.button>
  );
}
