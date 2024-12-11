import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: true,
};

export default nextConfig;

// next.config.js
module.exports = {
  images: {
    domains: ["lh3.googleusercontent.com"], // 必要なホスト名をここに追加
  },
};
