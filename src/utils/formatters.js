export const formatTemperature = (temp) => {
    return `${Math.round(temp)}°C`;
};

export const formatWindSpeed = (speed) => {
    return `${Math.round(speed)} km/h`;
};

export const formatHumidity = (humidity) => {
    return `${humidity}%`;
};

export const formatWeatherDescription = (description) => {
    return description.charAt(0).toUpperCase() + description.slice(1);
};