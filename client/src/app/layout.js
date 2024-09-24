import { Inter } from "next/font/google";
import "./globals.css";
import SignInPage from "./pages/signin/page";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body>{children}<SignInPage/></body> */}
    </html>
  );
}
