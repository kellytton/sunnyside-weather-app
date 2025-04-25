import { createContext, useContext, useState, useEffect } from "react";

// create a context for theme mode
const ThemeModeContext = createContext();

// provider component to wrap around parts of the app that need access
export const ThemeModeProvider = ({ children }) => {
    const [mode, setMode] = useState("light"); // default theme is light

    // fetch saved mode preference from backend when component mounts
    useEffect(() => {
        const fetchMode = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/preferences");
                const data = await res.json();

                // validate mode before setting
                if (data.mode === "dark" || data.mode === "light") {
                    setMode(data.mode);
                }
            } catch (err) {
                console.error("failed to fetch theme mode:", err);
            }
        };

        fetchMode();
    }, []);

    // toggle light/dark mode and persist to backend
    const toggleMode = async () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode); // update UI

        try {
            await fetch("http://localhost:3001/api/preferences", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode: newMode }),
            });
        } catch (err) {
            console.error("failed to update theme mode:", err);
        }
    };

    return (
        <ThemeModeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </ThemeModeContext.Provider>
    );
};

// custom hook to easily access theme mode state and toggle logic
export const useThemeMode = () => useContext(ThemeModeContext);