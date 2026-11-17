import { createContext, useState, useContext, useEffect, type ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if(!context) {
        throw new Error("useTheme повинен використовуватися всередині ThemeProvider");
    }

    return context;
}