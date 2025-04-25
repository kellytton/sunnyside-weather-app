import { createContext, useContext, useState, useEffect } from "react";

const ThemeModeContext = createContext();

export const ThemeModeProvider = ({ children }) => {
    const [mode, setMode] = useState("light");

    useEffect(() => {
        const fetchMode = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/preferences");
                const data = await res.json();
                if (data.mode === "dark" || data.mode === "light") {
                    setMode(data.mode);
                }
            } catch (err) {
                console.error("Failed to fetch theme mode:", err);
            }
        };
        fetchMode();
    }, []);

    const toggleMode = async () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);

        try {
            await fetch("http://localhost:3001/api/preferences", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode: newMode }),
            });
        } catch (err) {
            console.error("Failed to update theme mode:", err);
        }
    };

    return (
        <ThemeModeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </ThemeModeContext.Provider>
    );
};

export const useThemeMode = () => useContext(ThemeModeContext);