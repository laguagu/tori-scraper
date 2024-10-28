import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.tori.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
