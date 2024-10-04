import { Inter } from "next/font/google";
import "./globals.css";
import FooterComponent from "../components/Footer";
// import { FooterComponent } from "@/components/footer";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
