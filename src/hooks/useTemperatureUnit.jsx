import { useState, useEffect, createContext, useContext } from "react";

const TemperatureUnitContext = createContext();

export const TemperatureUnitProvider = ({ children }) => {
    const [unit, setUnit] = useState("celsius");

    // load saved preference from backend on mount
    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/preferences");
                const data = await res.json();
                if (data.unit === "fahrenheit" || data.unit === "celsius") {
                    setUnit(data.unit);
                }
            } catch (err) {
                console.error("Failed to fetch preferences:", err);
            }
        };

        fetchPreferences();
    }, []);

    const toggleUnit = async () => {
        const newUnit = unit === "celsius" ? "fahrenheit" : "celsius";
        setUnit(newUnit);

        try {
            await fetch("http://localhost:3001/api/preferences", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ unit: newUnit }),
            });
        } catch (err) {
            console.error("Failed to update temperature unit preference:", err);
        }
    };

    return (
        <TemperatureUnitContext.Provider value={{ unit, toggleUnit }}>
            {children}
        </TemperatureUnitContext.Provider>
    );
};

export const useTemperatureUnit = () => useContext(TemperatureUnitContext);