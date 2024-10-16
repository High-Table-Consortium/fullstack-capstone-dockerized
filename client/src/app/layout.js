import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import { AuthProvider } from "../context/authContent";
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
