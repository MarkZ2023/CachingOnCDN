import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import { cdnCachedSlugs } from "./src/lib/cache-policies";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const nextConfig: NextConfig = {
  turbopack: {
    root: rootDir,
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
