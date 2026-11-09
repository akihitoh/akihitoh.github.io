// サイトで扱うデータの型（data/*.yml と data/publications.ts に対応）

export type Lang = "ja" | "en";

export interface ResearchTheme {
  num: string;
  ja: string;
  en: string;
  tags: string[];
  en_title: string;
  en_desc: string;
}

export interface CvEntry {
  ja_when: string;
  ja: string;
  when: string;
  en: string;
  current?: boolean;
}

export interface Cv {
  appointments: CvEntry[];
  education: CvEntry[];
}

export interface Award {
  when: string;
  en_when: string;
  title: string;
  en_title: string;
  org: string;
  note?: string;
}

export interface Committee {
  when: string;
  en_when: string;
  title: string;
  en_title: string;
  org: string;
}

export interface Membership {
  when: string;
  en_when: string;
  title: string;
  en_title: string;
}

export interface Patent {
  when: string;
  title: string;
  number: string;
  applicant: string;
}

export interface Media {
  when: string;
  title: string;
  org: string;
}

export interface Activities {
  awards: Award[];
  committees: Committee[];
  memberships: Membership[];
  patents: Patent[];
  media: Media[];
}

export interface Fund {
  category: string;
  en_category: string;
  from: number;
  to?: number;
  title: string;
  en_title: string;
  en_translated?: boolean;
  field?: string;
  field_label?: string;
  number: string;
  url: string;
  en_url?: string;
  presto?: boolean;
  pi?: string;
  en_pi?: string;
}

export interface Funds {
  pi: Fund[];
  co: Fund[];
}

/** 業績 1 件。文字列、または DOI 付きのオブジェクト */
export type PubItem = string | { c: string; doi?: string };

export interface PubGroup {
  era: string;
  items: PubItem[];
}

export type PubCategoryKey = "journal" | "intl" | "domestic";

export interface PubCategory {
  key: PubCategoryKey;
  label: string;
  labelEn: string;
  groups: PubGroup[];
}

export type Publications = Record<PubCategoryKey, PubCategory>;
