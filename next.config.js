const { connectToDatabase } = require("./utils/mongo");

connectToDatabase()
  .then(() => {
    // Continue with your Next.js configuration
    /** @type {import('next').NextConfig} */
    const nextConfig = {};
    module.exports = nextConfig;
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit the process if database connection fails
  });
