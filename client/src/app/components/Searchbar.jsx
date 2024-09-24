import { useState } from 'react'


export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', searchQuery)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-400 to-sky-200">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Discover Your Next Adventure</h1>
        <p className="text-xl text-white">Find the perfect destination for your dream vacation</p>
      </div>

      <div className="w-full max-w-2xl px-4">
        <form onSubmit={handleSearch} className="flex items-center">
          <button type="submit" className="rounded-l-none bg-sky-600 hover:bg-sky-700">
            Search
          </button>
        </form>
      </div>

      <div className="mt-12 text-white text-center">
        <p className="mb-2">Popular Destinations:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {['Paris', 'Tokyo', 'New York', 'Rome', 'Sydney'].map((city) => (
            <button
              key={city}
              variant="outline"
              className="bg-white/20 hover:bg-white/30 text-white border-white"
              onClick={() => setSearchQuery(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}