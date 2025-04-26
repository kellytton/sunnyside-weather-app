import { useState, useEffect, createContext, useContext } from "react";

// create a context to share temperature unit state across the app
const TemperatureUnitContext = createContext();

// provider component to wrap around parts of the app that need access
export const TemperatureUnitProvider = ({ children }) => {
    const [unit, setUnit] = useState("celsius"); // default unit is celsius

    // fetch saved unit preference from backend when component mounts
    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/preferences");
                const data = await res.json(); // parse response into JS obj.

                // update local unit state if valid
                if (data.unit === "fahrenheit" || data.unit === "celsius") {
                    setUnit(data.unit);
                }
            } catch (err) {
                console.error("failed to fetch preferences:", err);
            }
        };
        // run fetchPreferences() only once when component mounts
        fetchPreferences();
    }, []);

    // toggle between celsius and fahrenheit, and update backend
    const toggleUnit = async () => {
        const newUnit = unit === "celsius" ? "fahrenheit" : "celsius";
        setUnit(newUnit); // update state right away

        try {
            await fetch("http://localhost:3001/api/preferences", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ unit: newUnit }),
            });
        } catch (err) {
            console.error("failed to update temperature unit preference:", err);
        }
    };

    return (
        <TemperatureUnitContext.Provider value={{ unit, toggleUnit }}>
            {children}
        </TemperatureUnitContext.Provider>
    );
};

// custom hook to easily access unit and toggle logic
export const useTemperatureUnit = () => useContext(TemperatureUnitContext);