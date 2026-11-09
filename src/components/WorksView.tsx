"use client";
// 研究業績一覧（カテゴリ切り替え・キーワード検索・年代ごとの折りたたみ）
import { Fragment, useMemo, useState, type ReactNode } from "react";
import { Badge } from "@astryxdesign/core/Badge";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Collapsible } from "@astryxdesign/core/Collapsible";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { HStack } from "@astryxdesign/core/HStack";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { Text } from "@astryxdesign/core/Text";
import { TextInput } from "@astryxdesign/core/TextInput";
import { VStack } from "@astryxdesign/core/VStack";
import { PUBLICATIONS } from "@data/publications";
import type { Lang, PubCategoryKey, PubGroup, PubItem } from "@/lib/types";
import { SectionHeader } from "./ui";

const CATS: PubCategoryKey[] = ["journal", "intl", "domestic"];
type CatFilter = PubCategoryKey | "all";

const T = {
  ja: {
    all: "すべて", unit: "件", search: "キーワードで検索", searchLabel: "業績を検索", category: "カテゴリ",
    expand: "すべて展開", collapse: "折りたたむ",
    emptyTitle: "該当する業績が見つかりませんでした", emptyDesc: "別のキーワードでお試しください。",
  },
  en: {
    all: "All", unit: "", search: "Search", searchLabel: "Search publications", category: "Category",
    expand: "Expand all", collapse: "Collapse",
    emptyTitle: "No matching publications", emptyDesc: "Try a different keyword.",
  },
} as const;

const textOf = (it: PubItem) => (typeof it === "string" ? it : it.c);
const doiOf = (it: PubItem) => (typeof it === "string" ? "" : it.doi ?? "");
const countOf = (k: PubCategoryKey) => PUBLICATIONS[k].groups.reduce((n, g) => n + g.items.length, 0);
const groupKey = (k: PubCategoryKey, g: PubGroup) => `${k}|${g.era}`;

/** 初期状態: 各カテゴリの最新の年代だけ開く */
function initialOpen(): Record<string, boolean> {
  const open: Record<string, boolean> = {};
  CATS.forEach((k) => PUBLICATIONS[k].groups.forEach((g, i) => (open[groupKey(k, g)] = i === 0)));
  return open;
}

const SELF = /(廣森 聡仁|Akihito Hiromori)/;

/** 本人名を太字にする */
function markSelf(text: string): ReactNode[] {
  return text.split(SELF).map((part, i) =>
    SELF.test(part) ? <strong className="me" key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>,
  );
}

/** 題目（最初の "…"）を強調し、本人名を太字にする */
function Citation({ text }: { text: string }) {
  const m = text.match(/^(.*?)"(.+?)"(.*)$/s);
  if (!m) return <>{markSelf(text)}</>;
  return (
    <>
      {markSelf(m[1])}&quot;<span className="ttl">{m[2]}</span>&quot;{markSelf(m[3])}
    </>
  );
}

function DoiLink({ doi }: { doi: string }) {
  return (
    <a href={`https://doi.org/${encodeURI(doi)}`} target="_blank" rel="noopener noreferrer" style={{ marginInlineStart: 6, display: "inline-block", verticalAlign: "middle" }}>
      <Badge variant="blue" label="DOI" />
    </a>
  );
}

export function WorksView({ lang }: { lang: Lang }) {
  const t = T[lang];
  const isEn = lang === "en";
  const [cat, setCat] = useState<CatFilter>("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>(initialOpen);

  const q = query.trim().toLowerCase();
  const total = CATS.reduce((n, k) => n + countOf(k), 0);
  const activeCats = cat === "all" ? CATS : [cat];

  const sections = useMemo(
    () =>
      activeCats
        .map((k) => {
          const groups = PUBLICATIONS[k].groups
            .map((g) => ({
              g,
              items: q
                ? g.items.filter((it) => textOf(it).toLowerCase().includes(q) || doiOf(it).toLowerCase().includes(q))
                : g.items,
            }))
            .filter(({ items }) => !q || items.length > 0);
          return { k, groups };
        })
        .filter(({ groups }) => groups.length > 0),
    [activeCats, q],
  );

  const setAll = (val: boolean) => {
    const next: Record<string, boolean> = {};
    CATS.forEach((k) => PUBLICATIONS[k].groups.forEach((g) => (next[groupKey(k, g)] = val)));
    setOpen(next);
  };

  return (
    <>
      <div className="pub-toolbar no-print">
        <div className="container">
          <HStack justify="between" align="center" wrap="wrap" gap={3}>
            <div className="seg-scroll">
            <SegmentedControl label={t.category} value={cat} onChange={(v) => setCat(v as CatFilter)}>
              <SegmentedControlItem value="all" label={`${t.all} ${total}`} />
              {CATS.map((k) => (
                <SegmentedControlItem
                  key={k}
                  value={k}
                  label={`${isEn ? PUBLICATIONS[k].labelEn : PUBLICATIONS[k].label} ${countOf(k)}`}
                />
              ))}
            </SegmentedControl>
            </div>
            <HStack gap={2} align="center" wrap="wrap">
              <TextInput
                label={t.searchLabel}
                isLabelHidden
                placeholder={t.search}
                value={query}
                onChange={(v) => setQuery(v)}
                startIcon="search"
                hasClear
                width={260}
              />
              <Button label={t.expand} size="md" variant="secondary" onClick={() => setAll(true)} />
              <Button label={t.collapse} size="md" variant="ghost" onClick={() => setAll(false)} />
            </HStack>
          </HStack>
        </div>
      </div>

      <div className="container" style={{ paddingBlock: "24px 96px" }}>
        {sections.length === 0 ? (
          <EmptyState title={t.emptyTitle} description={t.emptyDesc} />
        ) : (
          <VStack gap={10}>
            {sections.map(({ k, groups }) => (
              <section key={k}>
                <div style={{ marginBottom: 12 }}>
                  <SectionHeader
                    title={isEn ? PUBLICATIONS[k].labelEn : PUBLICATIONS[k].label}
                    sub={isEn ? undefined : PUBLICATIONS[k].labelEn}
                    count={`${countOf(k)}${t.unit}`}
                  />
                </div>
                <VStack gap={2}>
                  {groups.map(({ g, items }) => {
                    const key = groupKey(k, g);
                    return (
                      <Card key={key} padding={2}>
                        <Collapsible
                          isOpen={q ? true : !!open[key]}
                          onOpenChange={(v) => setOpen((o) => ({ ...o, [key]: v }))}
                          chevronPosition="start"
                          trigger={
                            <div className="era-trigger">
                              <Text weight="semibold" hasTabularNumbers>{g.era}</Text>
                              <Text type="supporting" hasTabularNumbers>{`${items.length}${t.unit}`}</Text>
                            </div>
                          }
                        >
                          <ol className="pub-list" style={{ paddingInline: 12 }}>
                            {items.map((it, i) => (
                              <li key={i}>
                                <span className="n">{i + 1}</span>
                                <span className="cite">
                                  <Citation text={textOf(it)} />
                                  {doiOf(it) && <DoiLink doi={doiOf(it)} />}
                                </span>
                              </li>
                            ))}
                          </ol>
                        </Collapsible>
                      </Card>
                    );
                  })}
                </VStack>
              </section>
            ))}
          </VStack>
        )}
      </div>
    </>
  );
}
