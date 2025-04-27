export const weatherMappings = {
    0: { desc: "Clear sky", food: "Perfect for a BBQ—grilled ribs and cold drinks under the sun." },
    1: { desc: "Mainly clear", food: "Perfect for a BBQ—grilled ribs and cold drinks under the sun." },
    2: { desc: "Partly cloudy", food: "The kind of day that calls for a picnic—sandwiches and fruit to keep things light." },
    3: { desc: "Overcast", food: "Feels like the right weather for a warm bowl of pasta—comfort food, nothing too heavy." },
    45: { desc: "Fog", food: "Feels like a day for dumplings—steamy, filling, and comforting." },
    48: { desc: "Depositing rime fog", food: "Feels like a day for dumplings—steamy, filling, and comforting." },
    51: { desc: "Light drizzle", food: "Ideal for cozy stew or homemade soup, perfect for a day inside." },
    53: { desc: "Moderate drizzle", food: "Ideal for cozy stew or homemade soup, perfect for a day inside." },
    55: { desc: "Dense drizzle", food: "Ideal for cozy stew or homemade soup, perfect for a day inside." },
    56: { desc: "Light freezing drizzle", food: "Perfect for hot chocolate and a warm bowl of chili, maybe add extra marshmallows." },
    57: { desc: "Dense freezing drizzle", food: "Perfect for hot chocolate and a warm bowl of chili, maybe add extra marshmallows." },
    61: { desc: "Slight rain", food: "Ideal for cozy stew or homemade soup, perfect for a day inside." },
    63: { desc: "Moderate rain", food: "Ideal for cozy stew or homemade soup, perfect for a day inside." },
    65: { desc: "Heavy rain", food: "Ideal for cozy stew or homemade soup, perfect for a day inside." },
    66: { desc: "Freezing rain (light)", food: "Perfect for hot chocolate and a warm bowl of chili, maybe add extra marshmallows." },
    67: { desc: "Freezing rain (heavy)", food: "Perfect for hot chocolate and a warm bowl of chili, maybe add extra marshmallows." },
    71: { desc: "Slight snow fall", food: "Perfect for hot chocolate and a warm bowl of chili, maybe add extra marshmallows." },
    73: { desc: "Moderate snow fall", food: "Perfect for hot chocolate and a warm bowl of chili, maybe add extra marshmallows." },
    75: { desc: "Heavy snow fall", food: "Perfect for hot chocolate and a warm bowl of chili, maybe add extra marshmallows." },
    77: { desc: "Snow grains", food: "Perfect for hot chocolate and a warm bowl of chili, maybe add extra marshmallows." },
    80: { desc: "Slight rain showers", food: "Ideal for cozy stew or homemade soup, perfect for a day inside." },
    81: { desc: "Moderate rain showers", food: "Ideal for cozy stew or homemade soup, perfect for a day inside." },
    82: { desc: "Violent rain showers", food: "Ideal for cozy stew or homemade soup, perfect for a day inside." },
    85: { desc: "Slight snow showers", food: "Perfect for hot chocolate and a warm bowl of chili, maybe add extra marshmallows." },
    86: { desc: "Heavy snow showers", food: "Perfect for hot chocolate and a warm bowl of chili, maybe add extra marshmallows." },
    95: { desc: "Thunderstorm", food: "Outdoor picnics canceled, trying to avoid flying plates and napkins." },
    96: { desc: "Thunderstorm with slight hail", food: "Outdoor picnics canceled, trying to avoid flying plates and napkins." },
    99: { desc: "Thunderstorm with heavy hail", food: "Outdoor picnics canceled, trying to avoid flying plates and napkins." },
};

// get just the short description
export function getWeatherDescription(code) {
    return weatherMappings[code]?.desc || "Unknown weather";
}

// get the food suggestion
export function getFoodSuggestion(code) {
    return weatherMappings[code]?.food || "Weather’s got its own flavor today—surprise yourself with something new!";
}