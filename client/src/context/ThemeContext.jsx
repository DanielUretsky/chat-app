import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");

    const themeToggle = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark");
        console.log(theme);
    }

    return (
        <ThemeContext.Provider value={{theme, themeToggle}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);