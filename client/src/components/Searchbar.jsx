"use client"

import React from 'react';

const SearchComponent = () => {
  return (
    <div className="max-w-[700px] mx-auto mt-[25px]">
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
            className="bg-yellow-50 border border-yellow-300 text-gray-900 text-sm  block w-full pl-10 p-2.5 dark:bg-yellow-500 dark:border-yellow-500 dark:placeholder-gray-400 dark:text-white "
            placeholder="Search Destination"
            required
            style={{ width: '400px' }} 
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-4 px-5 ml-2 text-sm font-medium text-white bg-yellow-500 border rounded-full shadow-lg hover:bg-green-900 focus:ring-4 focus:outline-none dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
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


