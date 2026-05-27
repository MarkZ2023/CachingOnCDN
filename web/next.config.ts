import type { NextConfig } from "next";
import { cdnCachedSlugs } from "../shared/cache-policies";

const nextConfig: NextConfig = {
  turbopack: {
    root: "..",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return cdnCachedSlugs.map((slug) => ({
      source: `/${slug}`,
      headers: [
        {
          key: "Cache-Control",
          value: "public, s-maxage=60, stale-while-revalidate=300",
        },
      ],
    }));
  },
};

export default nextConfig;
