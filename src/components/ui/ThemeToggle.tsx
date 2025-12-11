"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'
        >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
