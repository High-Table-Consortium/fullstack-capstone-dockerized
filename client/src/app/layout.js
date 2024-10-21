import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import { AuthProvider } from "../context/authContent";
export const metadata = {
  title: "Meeguide",
  description: "Admin dashboard for South African tourist attractions",
  // Add Open Graph image metadata
  openGraph: {
    title: "Meeguide",
    description: "Admin dashboard for South African tourist attractions",
    url: "https://Meeguide.com",
    images: [
      {
        url: "/mg.svg",
        width: 800,
        height: 600,
        alt: "A descriptive alt text for the image",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <CookiesProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
        
      </CookiesProvider>
    </AuthProvider>
  );
}
