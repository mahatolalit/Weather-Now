# Weather Now
Weather Now is a minimalist and modern weather application designed for outdoor enthusiasts and anyone who wants quick, accurate weather updates. It features a clean, professional interface and leverages the Open-Meteo API to provide real-time weather data for any location.

## Features

- **Instant Weather Search:** Search for current weather conditions in any city or location worldwide.
- **Live Weather Data:** Get up-to-date information including temperature, weather conditions, wind speed, and humidity.
- **Minimalist UI:** Clean, distraction-free interface for a seamless experience.
- **Loading Spinner:** Visual feedback while fetching data.
- **Reusable UI Components:** Modular components (buttons, cards, input fields) for easy customization and scalability.
- **Debounced Search:** Reduces excessive API calls by debouncing user input.
- **Responsive Design:** Fully responsive and mobile-friendly layout.
- **Error Handling:** User-friendly error messages for invalid locations or network issues.

## Project Structure

```
Weather-Now/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── logo.png
├── src/
│   ├── App.jsx
│   ├── main.js
│   ├── components/
│   │   ├── LoadingSpinner.jsx
│   │   ├── SearchBox.jsx
│   │   ├── WeatherCard.jsx
│   │   └── ui/
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       └── input.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── services/
│   │   └── weatherApi.js
│   ├── styles/
│   │   └── index.css
│   └── utils/
│       ├── debounce.js
│       └── formatters.js
```

## Installation

1. **Clone the repository:**
    ```powershell
    git clone https://github.com/mahatolalit/Weather-Now
    cd Weather-Now
    ```

2. **Install dependencies:**
    ```powershell
    npm install
    ```

3. **Start the development server:**
    ```powershell
    npm run dev
    ```
    The app will be available at `http://localhost:5173` (or as indicated in your terminal).

## Usage

1. Enter a city or location in the search box.
2. View the current weather details including temperature, weather description, wind speed, and humidity.
3. If the location is invalid or there is a network issue, a friendly error message will be displayed.

## Technologies Used

- **React** (Vite)
- **Open-Meteo API** for weather data
- **CSS** for styling
- **JavaScript (ES6+)**

## Folder Overview

- `src/components/` – React components for UI and functionality
- `src/components/ui/` – Reusable UI elements (Button, Card, Input)
- `src/services/weatherApi.js` – Handles API requests to Open-Meteo
- `src/utils/` – Utility functions (debounce, formatters)
- `src/styles/index.css` – Global styles

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
