"use client";
// ページ間で共有する小さな表示部品
import { Card } from "@astryxdesign/core/Card";
import { Link } from "@astryxdesign/core/Link";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { StatusDot } from "@astryxdesign/core/StatusDot";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  /** 見出しの横に添える補足（英語名など） */
  sub?: string;
  desc?: string;
  count?: string;
  level?: 1 | 2;
}

/** セクション見出し（小見出し・タイトル・説明・件数） */
export function SectionHeader({ eyebrow, title, sub, desc, count, level = 2 }: SectionHeaderProps) {
  return (
    <HStack justify="between" align="end" wrap="wrap" gap={4}>
      <VStack gap={1}>
        {eyebrow && <Text type="label" color="secondary">{eyebrow}</Text>}
        <HStack align="center" gap={3} wrap="wrap">
          <Heading level={level}>{title}</Heading>
          {sub && <Text type="supporting">{sub}</Text>}
        </HStack>
        {desc && (
          <Text as="p" type="body" color="secondary" display="block">
            {desc}
          </Text>
        )}
      </VStack>
      {count && <Text type="supporting" hasTabularNumbers>{count}</Text>}
    </HStack>
  );
}

export interface CvRow {
  when: string;
  what: string;
  sub?: string;
  current?: boolean;
}

/** 年月と内容の 2 列リスト（略歴・受賞・学会活動など） */
export function CvRows({ rows, currentLabel }: { rows: CvRow[]; currentLabel: string }) {
  return (
    <div>
      {rows.map((r, i) => (
        <div className="cv-row" key={`${r.when}-${i}`}>
          <HStack gap={1.5} align="center">
            {r.current && <StatusDot variant="success" label={currentLabel} />}
            <Text type="supporting" weight={r.current ? "semibold" : undefined} hasTabularNumbers>
              {r.when}
            </Text>
          </HStack>
          <VStack gap={0.5}>
            <Text>{r.what}</Text>
            {r.sub && <Text type="supporting">{r.sub}</Text>}
          </VStack>
        </div>
      ))}
    </div>
  );
}

/** 見出し付きの略歴カード。sections を縦に並べる */
export function CvCard({
  sections,
  currentLabel,
}: {
  sections: { eyebrow?: string; title: string; rows: CvRow[] }[];
  currentLabel: string;
}) {
  return (
    <Card padding={6}>
      <VStack gap={8}>
        {sections.map((s) => (
          <VStack gap={3} key={s.title}>
            <VStack gap={0.5}>
              {s.eyebrow && <Text type="label" color="secondary">{s.eyebrow}</Text>}
              <Heading level={2}>{s.title}</Heading>
            </VStack>
            <CvRows rows={s.rows} currentLabel={currentLabel} />
          </VStack>
        ))}
      </VStack>
    </Card>
  );
}

/** 下層ページの冒頭（小見出し・ページタイトル・説明） */
export function PageTitle({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="container" style={{ paddingBlock: "clamp(32px, 6vw, 56px) 16px" }}>
      <VStack gap={2}>
        <Text type="label" color="secondary">{eyebrow}</Text>
        <Heading level={1} type="display-3" weight="bold">{title}</Heading>
        {children && (
          <Text as="p" color="secondary" display="block">
            <span className="lede" style={{ display: "block" }}>{children}</span>
          </Text>
        )}
      </VStack>
    </div>
  );
}

/** リンク集のカード（About English の Links など） */
export function LinkListCard({ title, links }: { title: string; links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <Card padding={6}>
      <VStack gap={3}>
        <Text type="label" color="secondary">{title}</Text>
        {links.map((l) => (
          <Link key={l.href} href={l.href} isExternalLink={l.external} weight="medium">
            {l.label}
          </Link>
        ))}
      </VStack>
    </Card>
  );
}
