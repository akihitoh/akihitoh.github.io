import type { NextConfig } from "next";

// GitHub Pages（ユーザーサイト）向けの静的書き出し。/works/ のような末尾スラッシュ URL を維持する
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
