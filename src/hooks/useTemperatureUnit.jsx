import { useState, createContext, useContext } from "react";

const TemperatureUnitContext = createContext();

export const TemperatureUnitProvider = ({ children }) => {
    const [unit, setUnit] = useState("celsius"); // or "fahrenheit"

    const toggleUnit = () => {
        setUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"));
    };

    return (
        <TemperatureUnitContext.Provider value={{ unit, toggleUnit }}>
            {children}
        </TemperatureUnitContext.Provider>
    );
};

export const useTemperatureUnit = () => useContext(TemperatureUnitContext);