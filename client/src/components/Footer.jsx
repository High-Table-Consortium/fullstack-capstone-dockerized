"use client";

import React from "react";
import Link from "next/link"
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function FooterComponent() {
  return (
    <footer className="bg-green-950 border-t w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Policies */}
          {/* <Link href="/" className="flex items-center">
              <Image
                src="/house.png"
                alt="MeeGuide Logo"
                width={54}
                height={54}
                className="mr-2"
              />
              <span className="font-bold text-xl">MeeGuide</span>
            </Link> */}
          <div>
            <h3 className="text-lg text-yellow-100 font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-yellow-500 hover:text-gray-900 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-yellow-500 hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-100 mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-gray-900 transition-colors"
              >
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-gray-900 transition-colors"
              >
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-gray-900 transition-colors"
              >
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-gray-900 transition-colors"
              >
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg text-yellow-100 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-yellow-500 hover:text-gray-900 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="text-yellow-500 hover:text-gray-900 transition-colors"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/review"
                  className="text-yellow-500 hover:text-gray-900 transition-colors"
                >
                  Review
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-yellow-500 hover:text-gray-900 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
              <Link
                  href="/accountinfo"
                  className="text-yellow-500 hover:text-gray-900 transition-colors"
                >
                  Your account
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-yellow-500">
          <p>
            &copy; {new Date().getFullYear()} MeeGuide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}