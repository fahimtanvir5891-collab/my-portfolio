import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ১. টাইপস্ক্রিপ্ট এরর ইগনোর করো
  typescript: {
    ignoreBuildErrors: true,
  },
  // ২. লাল দাগ (ESLint) এরর ইগনোর করো
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ৩. ছবির পারমিশন (আগেরটাই)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;