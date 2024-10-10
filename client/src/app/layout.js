import { Inter } from "next/font/google";
import "./globals.css";
import FooterComponent from "../components/Footer";
// import { FooterComponent } from "@/components/footer";
import { AuthProvider } from '../context/authContent';
export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}
