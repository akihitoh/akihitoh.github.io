import "../globals.css";
import { figtree } from "../fonts";
import { Providers } from "../providers";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// ja ページ共通のルートレイアウト（html lang を言語ごとに切り替えるためルートグループで分割）
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={figtree.variable}>
      <body>
        <Providers>
          <SiteHeader lang="ja" />
          <main>{children}</main>
          <SiteFooter lang="ja" />
        </Providers>
      </body>
    </html>
  );
}
