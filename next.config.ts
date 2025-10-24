import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint checks during build
    ignoreDuringBuilds: true, 
  },
  /* other config options here */
};

export default nextConfig;
