import axios from 'axios';


/**
 * The function `getWeatherByLocation` fetches weather data for a specific location using the
 * OpenWeatherMap API asynchronously.
 * @param {string} locationName - The `locationName` parameter is a string that represents the name of
 * the location for which you want to retrieve weather data. It is used in the API request to fetch
 * weather information for that specific location.
 * @returns The function `getWeatherByLocation` is returning the weather data for a specific location
 * in JSON format. If the weather data is successfully fetched from the OpenWeatherMap API, it will
 * return the response data. If there is an error during the fetching process, it will log the error
 * and return `null`.
 */
export const getWeatherByLocation = async (lat: number, lon: number) => {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};
