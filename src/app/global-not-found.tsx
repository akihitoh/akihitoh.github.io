import "./globals.css";
import type { Metadata } from "next";
import { figtree } from "./fonts";
import { Providers } from "./providers";
import { NotFoundView } from "@/components/NotFoundView";

export const metadata: Metadata = { title: "ページが見つかりません | 廣森 聡仁 (Akihito Hiromori)" };

// 存在しない URL 用の 404 ページ（ルートレイアウトが日英 2 つあるため単独で html を持つ）
export default function GlobalNotFound() {
  return (
    <html lang="ja" className={figtree.variable}>
      <body>
        <Providers>
          <NotFoundView />
        </Providers>
      </body>
    </html>
  );
}
