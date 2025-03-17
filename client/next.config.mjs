/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for Netlify
  output: 'export',
  // Configure images with optimization disabled for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ]
  },
  // Disable server components for static export
  experimental: {
    appDir: true,
  },
  // Handle trailing slashes
  trailingSlash: true,
};

export default nextConfig;