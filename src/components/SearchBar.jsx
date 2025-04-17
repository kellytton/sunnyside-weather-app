import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    InputAdornment,
    Button
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function SearchBar({ onLocationSelect }) {
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchInput.trim() === "") {
                setSuggestions([]);
                return;
            }

            try {
                const res = await fetch(`http://localhost:3001/api/geocode/suggestions?name=${encodeURIComponent(searchInput)}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setSuggestions(data);
                } else {
                    setSuggestions([]);
                }
            } catch (err) {
                console.error("Error fetching suggestions:", err);
                setSuggestions([]);
            }
        };

        const debounce = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounce);
    }, [searchInput]);

    const handleAddLocation = () => {
        if (selectedLocation) {
            onLocationSelect(selectedLocation);
            setSelectedLocation(null);
            setSearchInput("");
            setSuggestions([]);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 2,
                mb: 2,
                alignSelf: "flex-end",
                mr: 4.4
            }}
        >
            <Autocomplete
                size="small"
                sx={{ width: 250 }}
                options={suggestions}
                getOptionLabel={(option) =>
                    `${option.name}${option.state ? ", " + option.state : ""}, ${option.country}`
                }
                filterOptions={(x) => x}
                value={selectedLocation}
                onChange={(event, newValue) => setSelectedLocation(newValue)}
                inputValue={searchInput}
                onInputChange={(event, newInputValue) => setSearchInput(newInputValue)}
                renderOption={(props, option) => (
                    <Box
                        component="li"
                        {...props}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            padding: '8px 12px',
                            backgroundColor: '#fff6e5', // soft warm tan
                            borderBottom: '1px solid #e0c896',
                            '&:hover': {
                                backgroundColor: '#f3ddb3',
                            }
                        }}
                    >
                        <span style={{ fontWeight: 600 }}>{option.name}</span>
                        <span style={{ fontSize: 12, color: '#555' }}>
                            {option.state ? `${option.state}, ` : ""}{option.country}
                        </span>
                    </Box>
                )}
                componentsProps={{
                    popper: {
                        sx: {
                            borderRadius: 2,
                            boxShadow: 3,
                            mt: 1,
                            backgroundColor: '#fff6e5', // same soft tan as list items
                            color: 'black',
                            zIndex: 1300,
                        }
                    },
                    paper: {
                        sx: {
                            backgroundColor: '#fff6e5', // match with your theme
                        }
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search City..."
                        placeholder="e.g. Paris"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiInputBase-input': {
                                color: 'black',
                            },
                        }}
                    />
                )}
            />
            <Button
                variant="contained"
                onClick={handleAddLocation}
                disabled={!selectedLocation}
            >
                <AddOutlinedIcon />
            </Button>
        </Box>
    );
}

export default SearchBar;
