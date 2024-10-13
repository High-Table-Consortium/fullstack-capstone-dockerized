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
import { ChevronDown, User } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
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
    try {
      setIsLoggedIn(false);
      setUsername("");
      localStorage.removeItem("username");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className=" bg-green-700 shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Home button */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="MeeGuide Logo"
                width={32}
                height={32}
                className="mr-2"
              />
              <span className="font-bold text-xl text-yellow-500">
                MeeGuide
              </span>
            </Link>
          </div>

          {/* Middle section */}
          <div className="flex items-center space-x-4">
            <Link
              href="/explore"
              className="px-3 py-2 rounded-md text-sm font-medium text-yellow-500 hover:text-yellow-300 hover:bg-green-800"
            >
              Explore
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 rounded-md text-sm font-medium text-yellow-500 hover:text-yellow-300 hover:bg-green-800"
            >
              About Us
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-yellow-500 border-yellow-500 hover:bg-green-800 hover:text-yellow-300"
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
                <DropdownMenuItem className="text-yellow-500 hover:text-yellow-300 hover:bg-green-800 focus:bg-green-800 focus:text-yellow-300">
                  <Link href="/wishlist" className="w-full">
                    Wishlist
                  </Link>
                </DropdownMenuItem>
                {isLoggedIn && (
                  <DropdownMenuItem className="text-yellow-500 hover:text-yellow-300 hover:bg-green-800 focus:bg-green-800 focus:text-yellow-300">
                    <Button
                      onClick={handleSignOut}
                      className="w-full text-left"
                    >
                      Sign Out
                    </Button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right section */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt={username}
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4 text-yellow-500" />
                  </AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm font-medium text-yellow-500">
                  {username}
                </span>
              </div>
            ) : (
              <Button
                onClick={handleSignInClick}
                variant="outline"
                className="ml-4 text-yellow-500 border-yellow-500 hover:bg-green-800 hover:text-yellow-300"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
