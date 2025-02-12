import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => [
    {
      source: "/credits",
      destination: "/credits.html"
    }
  ]
};

export default nextConfig;
