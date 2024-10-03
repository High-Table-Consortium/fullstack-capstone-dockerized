"use client"

import React from 'react';

const SearchComponent = () => {
  return (
    <div className="max-w-[700px] mx-auto mt-[100px]">
      <form className="flex items-center">
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
            className="bg-gray-50 border border-yellow-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            placeholder="Search Destination"
            required
          />
          <button type="button" className="flex absolute inset-y-0 right-0 items-center pr-3">
            <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-4 px-5 ml-2 text-sm font-medium text-white bg-green-900 border rounded-full shadow-lg hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
          style={{
            boxShadow: '8px 8px 15px rgba(0, 0, 0, 0.15), -8px -8px 15px rgba(255, 255, 255, 0.1)',
            border: 'none',
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;


