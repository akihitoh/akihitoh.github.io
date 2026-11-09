import type { MetadataRoute } from "next";
import { ALT_PATHS, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// 公開ページの一覧（日英の対応表に載っているページ＝全ページ）
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return Object.keys(ALT_PATHS).map((path) => ({ url: `${SITE_URL}${path}`, lastModified: now }));
}
