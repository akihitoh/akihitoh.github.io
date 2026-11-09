import { Figtree } from "next/font/google";

// 欧文フォント。ビルド時に取得して自己ホストする
export const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});
