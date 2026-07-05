import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "scontent.cdninstagram.com" },
      { protocol: "https", hostname: "*.cdninstagram.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/garhwal", destination: "/journeys/garhwal", permanent: true },
      { source: "/zanskar", destination: "/journeys/zanskar", permanent: true },
      { source: "/kumaon", destination: "/journeys/kumaon", permanent: true },
      { source: "/shivalik", destination: "/journeys/shivalik", permanent: true },
      { source: "/maa-nanda-devi", destination: "/journeys/maa-nanda-devi", permanent: true },
      { source: "/bio", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
