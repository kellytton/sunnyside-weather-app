// react and hooks
import React, { useEffect, useState } from "react";

// custom components
import LocationCard from "./LocationCard";

function LocationList() {
    const [locations, setLocations] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    // Function to fetch locations
    const fetchLocations = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/locations");
            const data = await res.json();
            setLocations(data);

            // Set the selected location based on data
            const selected = data.find(loc => loc.selected);
            if (selected) {
                setSelectedId(selected.id);
            }
        } catch (err) {
            console.error("Error fetching locations:", err);
        }
    };

    // Fetch locations on mount
    useEffect(() => {
        fetchLocations();
    }, []);

    // Handle select location logic
    const handleSelect = async (id) => {
        try {
            await fetch("http://localhost:3001/api/locations/select", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            // Re-fetch the locations after selecting a new one
            fetchLocations();
        } catch (err) {
            console.error("Error selecting location:", err);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {locations.map((location) => (
                <LocationCard
                    key={location.id}
                    location={location}
                    isSelected={selectedId === location.id}
                    onSelect={() => handleSelect(location.id)}
                />
            ))}
        </div>
    );
}

export default LocationList;