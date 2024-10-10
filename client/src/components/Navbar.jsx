"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ChevronDown, User, Menu } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setIsLoggedIn(true);
        setUsername(storedUsername);
      }
    };
    checkLoginStatus();
  }, []);

  const handleSignInClick = () => {
    router.push("/auth/signin");
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("username");
    router.push("/");
  };

  return (
    <nav className="bg-green-700 shadow-md border-b sticky top-0 z-50 text-yellow-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              {/* <Image
                src="/placeholder.svg?height=32&width=32"
                alt="MeeGuide Logo"
                width={32}
                height={32}
                className="mr-2"
              /> */}
              <span className="font-bold text-xl">MeeGuide</span>
            </Link>
          </div>

          {/* Middle Navigation Links */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/explore" className="hover:text-yellow-300">
              Explore
            </Link>
            <Link href="/about" className="hover:text-yellow-300">
              About Us
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  More <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-yellow-500">
                <DropdownMenuItem>
                  <Link href="/favorites" className="w-full">
                    Favorites
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/review" className="w-full">
                    Review
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/wishlist" className="w-full">
                    Wishlist
                  </Link>
                </DropdownMenuItem>
                {isLoggedIn && (
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-yellow-500 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Sign In / Avatar */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt={username}
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4 text-yellow-500" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{username}</span>
              </div>
            ) : (
              <Button
                onClick={handleSignInClick}
                variant="outline"
                className="text-yellow-500 border-yellow-500"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col mt-2 space-y-1 bg-green-700 rounded-lg py-2">
            <Link
              href="/explore"
              className="px-4 py-2 hover:bg-green-800 hover:text-yellow-300"
            >
              Explore
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 hover:bg-green-800 hover:text-yellow-300"
            >
              About Us
            </Link>
            <Link
              href="/favorites"
              className="px-4 py-2 hover:bg-green-800 hover:text-yellow-300"
            >
              Favorites
            </Link>
            <Link
              href="/review"
              className="px-4 py-2 hover:bg-green-800 hover:text-yellow-300"
            >
              Review
            </Link>
            <Link
              href="/wishlist"
              className="px-4 py-2 hover:bg-green-800 hover:text-yellow-300"
            >
              Wishlist
            </Link>
            {isLoggedIn && (
              <button
                onClick={handleSignOut}
                className="px-4 py-2 hover:bg-green-800 hover:text-yellow-300 text-left w-full"
              >
                Sign Out
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
