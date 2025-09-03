import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { getCitySuggestions } from '../services/weatherApi';
import { debounce } from '../utils/debounce';

const SearchBox = ({ onSearch }) => {
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef();

    // Debounced fetch for city suggestions
    const fetchSuggestions = useCallback(
        debounce(async (value) => {
            if (value.length < 2) {
                setSuggestions([]);
                setShowDropdown(false);
                return;
            }
            const results = await getCitySuggestions(value);
            setSuggestions(results);
            setShowDropdown(results.length > 0);
        }, 400),
        []
    );

    const handleInputChange = (e) => {
        const value = e.target.value;
        setCity(value);
        fetchSuggestions(value);
    };

    const handleSearch = (value = city) => {
        if (value.trim()) {
            onSearch(value.trim());
            setCity('');
            setSuggestions([]);
            setShowDropdown(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setCity(suggestion.name);
        setSuggestions([]);
        setShowDropdown(false);
        handleSearch(suggestion.name);
    };

    return (
        <div className="relative w-full max-w-md mx-auto">
            <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                <motion.div 
                    className="flex-grow"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <Input
                        ref={inputRef}
                        type="text"
                        placeholder="Enter city name..."
                        value={city}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className="flex-grow"
                        autoComplete="off"
                        onFocus={() => setShowDropdown(suggestions.length > 0)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                    />
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    <Button onClick={() => handleSearch()} size="icon" variant="default">
                        <Search className="h-4 w-4" />
                    </Button>
                </motion.div>
            </motion.div>
            {showDropdown && suggestions.length > 0 && (
                <motion.ul
                    className="absolute z-10 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {suggestions.map((s, idx) => (
                        <li
                            key={s.name + s.country + idx}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                            onMouseDown={() => handleSuggestionClick(s)}
                        >
                            {s.name}
                            {s.admin1 ? `, ${s.admin1}` : ''}
                            {s.country ? `, ${s.country}` : ''}
                        </li>
                    ))}
                </motion.ul>
            )}
        </div>
    );
};

export default SearchBox;