import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;

// next.config.js
module.exports = {
  images: {
    domains: ["lh3.googleusercontent.com"], // 必要なホスト名をここに追加
  },
};
