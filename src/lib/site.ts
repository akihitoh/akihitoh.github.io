// サイト共通の定数とメタデータ生成
import type { Metadata } from "next";
import type { Lang } from "./types";

export const SITE_URL = "https://akihitoh.github.io";
export const SITE_TITLE = "廣森 聡仁 (Akihito Hiromori)";
export const SITE_DESCRIPTION = "大阪大学 D3センター 准教授 廣森聡仁の研究紹介・業績・研究資金。";
export const SITE_DESCRIPTION_EN =
  "Akihito Hiromori, Associate Professor at D3 Center, The University of Osaka: research, publications and funding.";
export const OG_IMAGE = "/assets/img/og.png";

export const RESEARCHMAP_URL = "https://researchmap.jp/ahiromori";
export const KAKEN_URL_JA = "https://nrid.nii.ac.jp/ja/nrid/1000090506544/";
export const KAKEN_URL_EN = "https://nrid.nii.ac.jp/en/nrid/1000090506544/";

export interface NavItem {
  label: string;
  href: string;
  /** このパスで始まるページで選択状態にする（アンカーリンクは選択状態にしない） */
  match?: string;
}

export const NAV: Record<Lang, NavItem[]> = {
  ja: [
    { label: "研究テーマ", href: "/#themes" },
    { label: "業績", href: "/works/", match: "/works/" },
    { label: "研究資金", href: "/funds/", match: "/funds/" },
    { label: "略歴・活動", href: "/cv/", match: "/cv/" },
    { label: "連絡先", href: "/#contact" },
  ],
  en: [
    { label: "Research", href: "/about-en/#research" },
    { label: "Publications", href: "/en/publications/", match: "/en/publications/" },
    { label: "Funding", href: "/en/funding/", match: "/en/funding/" },
    { label: "CV", href: "/about-en/#cv" },
  ],
};

/** 日英の対応ページ（言語切り替えボタンと hreflang に使用） */
export const ALT_PATHS: Record<string, string> = {
  "/": "/about-en/",
  "/works/": "/en/publications/",
  "/funds/": "/en/funding/",
  "/cv/": "/about-en/#cv",
  "/about-en/": "/",
  "/en/publications/": "/works/",
  "/en/funding/": "/funds/",
};

export function altPathOf(path: string, lang: Lang): string {
  return ALT_PATHS[path] ?? (lang === "en" ? "/" : "/about-en/");
}

interface PageMetaInput {
  lang: Lang;
  /** ページ固有のタイトル。省略時はサイト名のみ */
  title?: string;
  description?: string;
  path: string;
}

/** ページごとの title / canonical / hreflang / OGP をまとめて生成する */
export function pageMetadata({ lang, title, description, path }: PageMetaInput): Metadata {
  const altPath = altPathOf(path, lang).split("#")[0];
  const fullTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  const desc = description ?? (lang === "en" ? SITE_DESCRIPTION_EN : SITE_DESCRIPTION);
  const altLang: Lang = lang === "en" ? "ja" : "en";
  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description: desc,
    alternates: {
      canonical: path,
      languages: { [lang]: path, [altLang]: altPath },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_TITLE,
      title: fullTitle,
      description: desc,
      locale: lang === "en" ? "en_US" : "ja_JP",
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc, images: [OG_IMAGE] },
    icons: { icon: "/assets/img/favicon.svg" },
  };
}
