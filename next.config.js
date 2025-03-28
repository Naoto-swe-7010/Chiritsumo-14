/** @type {import("next").NextConfig} */
const config = {
  // 画像の外部ドメインを許可する設定(Googleのプロフィール画像)
  images: {
    domains: ['lh3.googleusercontent.com'] // Googleのプロフィール画像ホストを許可
  },
  // その他のNext.jsの設定（例: React Strict Modeの有効化）
  reactStrictMode: true
};

module.exports = config;
