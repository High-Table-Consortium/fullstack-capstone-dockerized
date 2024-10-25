"use client"

import { React, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchAttraction } from '../app/API/api';


const SearchComponent = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (query) => {
    try {
      // Search by searchTerm for name and location, with additional filters
      const results = await searchAttraction(query, 'popularity', '', '');
      setSuggestions(results || []);
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred while searching');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }

    setIsLoading(true);
    setError('');
    setShowSuggestions(false);  // Hide suggestions on form submit

    try {
      const results = await searchAttraction(searchTerm, 'popularity', '', '');
      if (results && results.length > 0) {
        localStorage.setItem('searchResults', JSON.stringify(results));
        router.push(`/search-results?q=${encodeURIComponent(searchTerm)}`);
      } else {
        setError('No destinations found');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred while searching');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      setShowSuggestions(true);
      fetchSuggestions(value);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);  // Set clicked suggestion as the search term
    setShowSuggestions(false);       // Hide suggestions
    router.push(`/destination/${suggestion._id}`);  // Navigate to suggestion page
  };

  return (
    <div className="max-w-[700px] mx-auto mt-[25px]">
      <form onSubmit={handleSearch} className="flex items-center">
        <label htmlFor="voice-search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            className="bg-yellow-50 border border-yellow-300 text-gray-900 text-sm  block w-full pl-10 p-2.5 dark:bg-yellow-500 dark:border-yellow-500 dark:placeholder-gray-400 dark:text-white "
            placeholder="Search Destination"
            required
            value={searchTerm}
            onChange={handleInputChange}
            style={{ width: '400px' }}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg mt-1">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion._id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                >
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 mr-2"
                      src={suggestion.image}
                      alt={suggestion.name}
                    />
                    {suggestion.name} - {suggestion.location}
                  </div>

                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`inline-flex items-center py-4 px-5 ml-2 text-sm font-medium text-white bg-yellow-500 border rounded-full shadow-lg hover:bg-green-900 focus:ring-4 focus:outline-none dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 transition-all duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          style={{
            boxShadow: '8px 8px 15px rgba(0, 0, 0, 0.15), -8px -8px 15px rgba(255, 255, 255, 0.1)',
            border: 'none',
          }}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Searching...
            </div>
          ) : (
            'Search'
          )}
        </button>

      </form>
      {error && (
        <div className="mt-2 text-red-500 text-sm text-center">{error}</div>
      )}
    </div>
  );
};

export default SearchComponent;


