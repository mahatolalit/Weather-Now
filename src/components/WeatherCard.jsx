import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Thermometer } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const WeatherCard = ({ weatherData, isLoading }) => {
    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Card className="w-full max-w-md mx-auto">
                    <CardContent className="flex items-center justify-center p-8">
                        <LoadingSpinner />
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    if (!weatherData) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Card className="w-full max-w-md mx-auto">
                    <CardContent className="text-center p-8">
                        <p className="text-gray-500">Search for a city to see weather information</p>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    const getWeatherIcon = (condition) => {
        const iconClass = "h-12 w-12 text-blue-600";
        switch (condition?.toLowerCase()) {
            case 'sunny':
            case 'clear':
            case 'mostly clear':
                return <Sun className={iconClass} />;
            case 'rain':
            case 'light rain':
            case 'heavy rain':
            case 'drizzle':
            case 'light drizzle':
            case 'heavy drizzle':
            case 'showers':
            case 'light showers':
            case 'heavy showers':
                return <CloudRain className={iconClass} />;
            case 'snow':
            case 'light snow':
            case 'heavy snow':
                return <CloudSnow className={iconClass} />;
            case 'cloudy':
            case 'partly cloudy':
            case 'overcast':
                return <Cloud className={iconClass} />;
            default:
                return <Cloud className={iconClass} />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                    >
                        <CardTitle className="text-2xl font-bold">{weatherData.city}</CardTitle>
                    </motion.div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <motion.div 
                        className="flex items-center justify-center space-x-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                        >
                            {getWeatherIcon(weatherData.condition)}
                        </motion.div>
                        <div className="text-center">
                            <motion.p 
                                className="text-4xl font-bold"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                            >
                                {weatherData.temperature}°C
                            </motion.p>
                            <motion.p 
                                className="text-gray-500 capitalize"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.3 }}
                            >
                                {weatherData.condition}
                            </motion.p>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        className="grid grid-cols-2 gap-4 mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                    >
                        <motion.div 
                            className="flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Wind className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-500">
                                {weatherData.windSpeed || 'N/A'} km/h
                            </span>
                        </motion.div>
                        <motion.div 
                            className="flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Droplets className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-500">
                                {weatherData.humidity || 'N/A'}%
                            </span>
                        </motion.div>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default WeatherCard;