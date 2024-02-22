import React, { ReactNode, createContext, useContext, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { twitter_blue } from "./colors";

interface ThemeContextType {
    toggleTheme: () => void;
    theme: "light" | "dark";
}

const lightTheme = createTheme({
    palette: {
        mode:"light",
        primary: {
            main: "#000"
        },
        secondary: {
            main: '#cccccc'
        },
        background: {
            default: "#fff",
            paper:"#fff",
        },
        text: {
            primary: "#000",

        }
    }
});

const darkTheme = createTheme({
    palette: {
        mode:"dark",
        primary: {
            main: twitter_blue
        },
        secondary: {
            main: '#cccccc'
        },
        background: {
            default: "#000",
            paper:"#000",
        },
        text: {
            primary: "#fff"
        }
    }
});

const ThemeContext = createContext<ThemeContextType>({
    toggleTheme: () => { },
    theme: "light"
});

export const useThemeContext = () => useContext(ThemeContext);
interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};