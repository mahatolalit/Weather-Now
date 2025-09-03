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
        <motion.header
          className="text-center py-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center justify-center space-x-3 mb-2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Cloud className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Weather Now</h1>
          </motion.div>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Quick weather updates for any city
          </motion.p>
        </motion.header>

        {/* Search Section */}

        {/* Error Message */}

        {/* Weather Card */}

        {/* Footer */}
      </div>
    </div>
  )
}

export default App