"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../provider/ThemeContextProvider";

const navIconButtonClass =
    "bg-nav text-nav-foreground border-nav-foreground/50 hover:bg-nav-foreground hover:text-nav";

const Theme = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className={navIconButtonClass}
        >
            {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
    );
};
export default Theme;
