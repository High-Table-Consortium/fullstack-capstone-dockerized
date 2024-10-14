'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { Compass, Heart, User, LogOut, Info, LogIn, Menu, Search, ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import Image from "next/image";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../components/ui/dropdown-menu';
import { Button } from '../components/ui/button';

export default function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false) 
  const router = useRouter()

  useEffect(() => {
    const checkLoginStatus = () => {
      const storedUsername = localStorage.getItem("username")
      if (storedUsername) {
        setIsSignedIn(true)
        setUsername(storedUsername)
      }
    }
    checkLoginStatus()
  }, [])

  const handleSignInClick = () => {
    router.push("/auth/signin")
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
    setUsername("")
    localStorage.removeItem("username")
    router.push("/")
  }

  const NavItems = () => (
    <>
      <Link href="/explore" className="relative text-yellow-500 neumorphic-button flex items-center group">
        <Compass className="mr-2 h-4 w-4" />
        Explore
        <span className="absolute bottom-[-3px] left-0 w-full h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </Link>
      {/* <Link href="/wishlist" className="relative text-yellow-500 neumorphic-button flex items-center group">
        <Heart className="mr-2 h-4 w-4" />
        Wishlist
        <span className="absolute bottom-[-3px] left-0 w-full h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </Link> */}
      <Link href="/about" className="relative text-yellow-500 neumorphic-button flex items-center group">
        <Info className="mr-2 h-4 w-4" />
        About Us
        <span className="absolute bottom-[-3px] left-0 w-full h-0.5 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </Link>
    </>
  )

  return (
    <nav className="bg-green-950 text-gold-300 p-4 shadow-[inset_-12px_-8px_40px_#46464620]">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side: Logo and title */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="MeeGuide Logo"
              width={236}
              height={236}
              className="mr-2"
            />
          </Link>
        </div>

        {/* Middle: Navigation buttons (static, no change based on sign-in state) */}
        <div className="hidden md:flex space-x-4 text-yellow-500">
          <NavItems />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-yellow-500 border-yellow-500 hover:bg-green-800 hover:text-yellow-300 neumorphic-button"
              >
                More <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-green-700 border border-yellow-500">
              <DropdownMenuItem className="text-yellow-500 hover:text-yellow-300 hover:bg-green-800 focus:bg-green-800 focus:text-yellow-300">
                <Link href="/favourites" className="w-full">
                  Favourites
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-yellow-500 hover:text-yellow-300 hover:bg-green-800 focus:bg-green-800 focus:text-yellow-300">
                <Link href="/review" className="w-full">
                  Review
                </Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem className="text-yellow-500 hover:text-yellow-300 hover:bg-green-800 focus:bg-green-800 focus:text-yellow-300">
                <Link href="/wishlist" className="w-full">
                  Wishlist
                </Link>
              </DropdownMenuItem> */}
              {isSignedIn && (
                <DropdownMenuItem className="text-yellow-500 hover:text-yellow-300 hover:bg-green-800 focus:bg-green-800 focus:text-yellow-300">
                  <button onClick={handleSignOut} className="w-full text-left">
                    Sign Out
                  </button>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right side: Sign in/Profile and Search icon */}
        <div className="hidden md:flex items-center space-x-4">
          {isSignedIn ? (
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt={username} />
                <AvatarFallback>
                  <User className="h-4 w-4 text-gold-300" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{username}</span>
              <button onClick={handleSignOut} className="text-gold-300 hover:text-gold-100 hover:bg-emerald-700 neumorphic-button flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignInClick}
              className="text-yellow-500 hover:text-yellow-500 neumorphic-button hover:py-1 hover:px-1 flex items-center hover:ring-4 hover:ring-yellow-100 transition duration-300 ease-in-out"
            >
              <LogIn className="mr-2 h-4 w-4 text-yellow-500" />
              Sign In / Create Account
            </button>
          )}
          {/* Search icon */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-gold-300 hover:text-gold-100 flex items-center"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gold-300 hover:text-gold-100 hover:bg-emerald-700 neumorphic-button flex items-center">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>

      {/* Search input area (only visible when search icon is clicked) */}
      {isSearchOpen && (
        <div className="bg-emerald-900 p-4 mt-2 flex justify-center">
          <input
            type="text"
            placeholder="Enter keywords..."
            className="w-full max-w-3xl p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900"
          />
        </div>
      )}

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col mt-2 space-y-1 bg-emerald-800 rounded-lg py-2">
          {/* Search Input */}
          <div className="px-4">
            <form className="flex items-center">
              <label htmlFor="mobile-search" className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="mobile-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
              </div>
            </form>
          </div>

          {/* Nav items */}
          <NavItems />

          {isSignedIn ? (
            <>
              <Link href="/profile" className="block px-4 py-2 text-yellow-500">
                Profile
              </Link>
              <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-yellow-500">
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={handleSignInClick} className="block w-full text-left px-4 py-2 text-yellow-500">
              Sign In / Create Account
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
