import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Ensure the project uses Webpack instead of Turbopack
    config.resolve.alias = {
      ...config.resolve.alias,
      "react/jsx-runtime": "react/jsx-runtime", // For compatibility
    };
    return config;
  },
};

export default nextConfig;
