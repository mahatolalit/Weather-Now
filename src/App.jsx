import React, { useState } from 'react'
import { fetchWeather } from './services/weatherApi';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4'>
      <div className='container mx-auto max-w-4xl'>
        {/* Header */}

        {/* Search Section */}

        {/* Error Message */}

        {/* Weather Card */}

        {/* Footer */}
      </div>
    </div>
  )
}

export default App