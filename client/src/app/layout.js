import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import { AuthProvider } from "../context/authContent";
import { FavouritesProvider } from "../context/favourites";
import {Toaster} from "../components/ui/toaster"
export const metadata = {
  title: "Meeguide",
  description: "Admin dashboard for South African tourist attractions",
  // Add Open Graph image metadata
  metadataBase: new URL('https://meeguide.netlify.app/'),
  openGraph: {
    title: "Meeguide",
    description: "Admin dashboard for South African tourist attractions",
    url: "https://meeguide.netlify.app/",
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
    <html lang="en">
      <body>
        <AuthProvider>
          <CookiesProvider>
            <Toaster/>
            <FavouritesProvider>
              {children}
            </FavouritesProvider>
          </CookiesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
