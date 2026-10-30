import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  // microCMSのキャッシュ: 1日1回再生成（旧 revalidate = 86400 相当）
  cacheLife: {
    daily: { stale: 300, revalidate: 86400, expire: 604800 },
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
