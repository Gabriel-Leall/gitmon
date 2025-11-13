import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains is deprecated; use remotePatterns instead
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
