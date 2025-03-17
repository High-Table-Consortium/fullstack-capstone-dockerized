module.exports = {
  // Your Netlify build settings
  build: {
    // Base directory
    base: "client",
    // Build command
    command: "npm run build",
    // Directory to publish (relative to root of your repo)
    publish: "build",
    // Environment variables
    environment: {
      NEXT_PUBLIC_API_URL: "https://fullstack-capstone-ar7c.onrender.com/api",
      NEXT_PUBLIC_MODEL_URL: "https://fullstack-capstone-dockerized-ai.onrender.com"
    }
  }
};
