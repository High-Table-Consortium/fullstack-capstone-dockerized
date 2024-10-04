"use client"

import { useState } from 'react'
import { Search } from "lucide-react"

const ReviewSearch =() => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    //search logic goes here
    console.log('Searching for:', searchQuery)
  }

  return (
    <div className="min-h-screen bg-emerald-900 text-gold-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gold-400">
          Destination Reviews
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gold-200">
          Discover the world through the eyes of fellow travelers
        </p>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 justify-center">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for a destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-emerald-800 text-gold-100 placeholder-gold-300 border-2 border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-400" size={20} />
          </div>
          <button 
            type="submit"
            className="bg-gold-400 hover:bg-gold-500 text-emerald-900 font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReviewSearch