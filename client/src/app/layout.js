import { Inter } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";

import FooterComponent from "../components/Footer";
// import { FooterComponent } from "@/components/footer";
import { AuthProvider } from "../context/authContent";
export default function RootLayout({ children }) {
  return (
    <CookiesProvider>
      <AuthProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </AuthProvider>
    </CookiesProvider>
  );
}
