'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, Heart, User, LogOut, Info, LogIn, Menu, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import Image from 'next/image';
import { useAuth } from '../context/authContent';
import { searchAttraction } from '../app/API/api';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const { isAuthenticated, user, logout } = useAuth();

  const fetchSuggestions = async (query) => {
    try {
      const results = await searchAttraction(query, 'popularity', '', '');
      setSuggestions(results || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    try {
      const results = await searchAttraction(searchTerm, 'popularity', '', '');
      if (results && results.length > 0) {
        localStorage.setItem('searchResults', JSON.stringify(results));
        router.push(`/search-results?q=${encodeURIComponent(searchTerm)}`);
      } else {
        console.log('No results found');
      }
    } catch (error) {
      console.error('Search error:', error);
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
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
    router.push(`/destination/${suggestion._id}`);
  };

  const handleSignInClick = () => {
    router.push('/auth/signin');
  };

  const handleSignOut = () => {
    try {
      logout();
      router.push('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const NavItems = () => (
    <>
      <Link href="/explore" className="relative text-yellow-500 neumorphic-button flex items-center group">
        <Compass className="mr-2 h-4 w-4" />
        Explore
        <span className="absolute bottom-[-3px] left-0 w-full h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </Link>
      <Link href="/favourites" className="relative text-yellow-500 neumorphic-button flex items-center group">
        <Heart className="mr-2 h-4 w-4" />
        Wishlist
        <span className="absolute bottom-[-3px] left-0 w-full h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </Link>
      <Link href="/about" className="relative text-yellow-500 neumorphic-button flex items-center group">
        <Info className="mr-2 h-4 w-4" />
        About Us
        <span className="absolute bottom-[-3px] left-0 w-full h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </Link>
    </>
  );

  return (
    <nav className="bg-green-950 text-gold-300 p-4 shadow-[inset_-12px_-8px_40px_#46464620]">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="MeeGuide Logo" width={236} height={236} className="mr-2" />
          </Link>
        </div>

        <div className="hidden lg:flex space-x-4 text-yellow-500">
          <NavItems />
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              <Link href="/account">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.name || "User"} />
                  <AvatarFallback>
                    <User className="h-4 w-4 text-gold-300" />
                  </AvatarFallback>
                </Avatar>
              </Link>
              <span className="text-sm font-medium text-white">{user?.firstName || user?.email}</span>
              <button onClick={handleSignOut} className="text-yellow-500 hover:text-gold-100 hover:bg-emerald-700 neumorphic-button flex items-center">
                <LogOut className="mr-2 h-4 w-4 text-yellow-500" />
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={handleSignInClick} className="text-yellow-500 hover:text-yellow-500 rounded-lg neumorphic-button hover:py-1 hover:px-1 flex items-center hover:ring-4 hover:ring-green-900 transition duration-300 ease-in-out">
              <LogIn className="mr-2 h-4 w-4 text-yellow-500" />
              Sign In / Create Account
            </button>
          )}
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-gold-300 hover:text-gold-100 flex items-center">
            <Search className="h-5 w-5" />
          </button>
        </div>

        <div className="lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gold-300 hover:text-gold-100 hover:bg-emerald-700 neumorphic-button flex items-center">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>

     {/* Apply functionality to this search input as well as the suggestions */}
     {isSearchOpen && (
        <div className="bg-emerald-900 p-4 mt-2 flex justify-center">
          <form onSubmit={handleSearchSubmit} className="w-full max-w-3xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter keywords..."
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900"
                value={searchTerm}
                onChange={handleInputChange}
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
                        <img className="h-8 w-8 mr-2" src={suggestion.image} alt={suggestion.name} />
                        {suggestion.name} - {suggestion.location}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </form>
        </div>
      )}

      {(isMobileMenuOpen || isSearchOpen) && (
        <div className="flex flex-col mt-2 space-y-2 bg-emerald-800 rounded-lg py-3 lg:hidden">
          <div className="px-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <label htmlFor="mobile-search" className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-500" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="mobile-search"
                  className="bg-yellow-50 border border-yellow-300 text-gray-900 text-sm block w-full pl-10 p-2.5"
                  placeholder="Search..."
                  required
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg mt-1">
                    {suggestions.map((suggestion) => (
                      <li key={suggestion._id} onClick={() => handleSuggestionClick(suggestion)} className="cursor-pointer p-2 hover:bg-gray-200">
                        <div className="flex items-center">
                          <img className="h-8 w-8 mr-2" src={suggestion.image} alt={suggestion.name} />
                          {suggestion.name} - {suggestion.location}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </form>
          </div>

          <div className="flex flex-col ml-5 space-y-4 text-yellow-500">
            <NavItems />
          </div>

          {!user ? (
            <Link href="/auth/signin" className="px-4 py-2 text-yellow-500 flex items-center hover:bg-gray-200">
              <LogIn className="mr-2 h-4 w-4 text-yellow-500" />
              Sign In / Create Account
            </Link>
          ) : (
            <button onClick={handleSignOut} className="px-4 py-2 text-yellow-500 flex items-center hover:bg-gray-200">
              <LogOut className="mr-2 h-4 w-4 text-yellow-500" />
              Sign Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
