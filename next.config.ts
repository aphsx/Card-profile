import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Security: prevent leakage of file system paths
  poweredByHeader: false,
};

export default nextConfig;
