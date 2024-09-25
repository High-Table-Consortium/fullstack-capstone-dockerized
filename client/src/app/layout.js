import { Inter } from "next/font/google";
import "./globals.css";
import SignInPage from "./signin/page";
import ReviewPage from "./review/page";
import ExplorePage from "./explore/page";
import ReviewSearch from "./reviewsearch/page";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}
        
        </body>
    </html>
  );
}
