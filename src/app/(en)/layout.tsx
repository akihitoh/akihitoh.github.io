import "../globals.css";
import { figtree } from "../fonts";
import { Providers } from "../providers";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// en ページ共通のルートレイアウト（html lang を言語ごとに切り替えるためルートグループで分割）
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <body>
        <Providers>
          <SiteHeader lang="en" />
          <main>{children}</main>
          <SiteFooter lang="en" />
        </Providers>
      </body>
    </html>
  );
}
