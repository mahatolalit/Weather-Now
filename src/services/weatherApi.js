// Open-Meteo API
const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

//Function to get coordinates from city name
export const getCoordinatesFromCity = async (cityName) => {
    try {
        const response = await fetch(
            `${GEOCODING_BASE_URL}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
        );

        if (!response.ok) {
            throw new Error('Geocoding request failed');
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error('City not found');
        }

        const result = data.results[0];
        return {
            latitude: result.latitude,
            longitude: result.longitude,
            city: result.name,
            country: result.country,
            admin1: result.admin1
        };

    } catch (error) {
        console.error('Error in geocoding: ', error);
        throw new Error('Failed to find city coordinates');
    }
};

// Weather condition mapping from WMO codes
const getWeatherCondition = (weatherCode) => {
    const conditions = {
        0: 'Clear',
        1: 'Mostly Clear',
        2: 'Partly Cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Foggy',
        51: 'Light Drizzle',
        53: 'Drizzle',
        55: 'Heavy Drizzle',
        61: 'Light Rain',
        63: 'Rain',
        65: 'Heavy Rain',
        71: 'Light Snow',
        73: 'Snow',
        75: 'Heavy Snow',
        80: 'Light Showers',
        81: 'Showers',
        82: 'Heavy Showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with Hail',
        99: 'Thunderstorm with Hail'
    };

    return conditions[weatherCode] || 'Unknown';
};

// Main function fir fetchin weather data by city name
export const fetchWeather = async (cityName) => {
    try {
        //Get coordinates from city name
        const locationData = await getCoordinatesFromCity(cityName);

        // Use coordinates to fetch weather
        const weatherResponse = await fetch(
            `${WEATHER_BASE_URL}?latitude=${locationData.latitude}&longitude=${locationData.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
        );

        if (!weatherResponse.ok) {
            throw new Error('Weather request failed');
        }

        const weatherData = await weatherResponse.json();

        // Format the response
        return {
            city: `${locationData.city}, ${locationData.country}`,
            temperature: Math.round(weatherData.current.temperature_2m),
            condition: getWeatherCondition(weatherData.current.weather_code),
            humidity: weatherData.current.relative_humidity_2m,
            windSpeed: Math.round(weatherData.current.wind_speed_10m),
            coordinates: {
                latitude: locationData.latitude,
                longitude: locationData.longitude
            }
        };

    } catch (error) {
        console.error('Error fetching weather data: ', error);
        throw new Error(error.message || 'Failed to fetch weather data');
    }
};

// Function to fetch city suggestions for autocompletion
export const getCitySuggestions = async (query) => {
    // Skip API call if query is empty or less than 2 characters
    if (!query || query.length < 2) return [];

    try {
        const response = await fetch(
            `${GEOCODING_BASE_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
        );
        if (!response.ok) return [];
        const data = await response.json();

        if (!data.results) return [];
        return data.results.map(result => ({
            name: result.name,
            country: result.country,
            admin1: result.admin1,
            latitude: result.latitude,
            longitude: result.longitude
        }));
    } catch {
        return [];
    }
};