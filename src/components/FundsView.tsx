"use client";
// 外部研究資金（研究代表者は 1 列の詳細カード、研究分担者は 2 列の簡易カード）
import { Badge } from "@astryxdesign/core/Badge";
import { ClickableCard } from "@astryxdesign/core/ClickableCard";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { Fund, Funds, Lang } from "@/lib/types";
import { SectionHeader } from "./ui";

function years(f: Fund, isEn: boolean): string {
  const span = f.to ? `${f.from}–${f.to}` : `${f.from}`;
  return isEn ? `FY${span}` : `${span}年度`;
}

function Title({ f, isEn }: { f: Fund; isEn: boolean }) {
  if (!isEn) return <>{f.title}</>;
  return (
    <>
      {f.en_title}
      {f.en_translated && (
        <>
          {" "}
          <Badge label="translated" />
        </>
      )}
    </>
  );
}

function Meta({ items }: { items: [string, string][] }) {
  return (
    <HStack gap={4} wrap="wrap">
      {items.map(([k, v]) => (
        <Text type="supporting" key={k}>
          {k} <Text type="supporting" color="primary" weight="medium">{v}</Text>
        </Text>
      ))}
    </HStack>
  );
}

function PiCard({ f, isEn }: { f: Fund; isEn: boolean }) {
  const tag = f.presto ? `JST ${isEn ? "PRESTO" : "さきがけ"}` : isEn ? "KAKENHI" : `科研費 ${f.category}`;
  const meta: [string, string][] = isEn
    ? [["Category", f.en_category], ["Grant No.", f.number]]
    : [
        ["研究種目", f.category],
        ...(f.field ? [[f.field_label ?? "研究分野", f.field] as [string, string]] : []),
        ["課題番号", f.number],
      ];
  return (
    <ClickableCard label={isEn ? f.en_title : f.title} href={isEn && f.en_url ? f.en_url : f.url} target="_blank" padding={5}>
      <VStack gap={3}>
        <HStack justify="between" align="center" wrap="wrap" gap={2}>
          <Badge variant={f.presto ? "purple" : "blue"} label={tag} />
          <Text type="supporting" hasTabularNumbers>{years(f, isEn)}</Text>
        </HStack>
        <Heading level={3}><Title f={f} isEn={isEn} /></Heading>
        <Meta items={meta} />
      </VStack>
    </ClickableCard>
  );
}

function CoCard({ f, isEn }: { f: Fund; isEn: boolean }) {
  const tag = isEn ? f.en_category.replace("Grant-in-Aid for ", "") : `科研費 ${f.category}`;
  const meta: [string, string][] = isEn
    ? [["PI", f.en_pi ?? ""], ["Grant No.", f.number]]
    : [["研究代表者", f.pi ?? ""], ["課題番号", f.number]];
  return (
    <ClickableCard label={isEn ? f.en_title : f.title} href={f.url} target="_blank" padding={5} height="100%">
      <VStack gap={3} height="100%">
        <HStack justify="between" align="center" wrap="wrap" gap={2}>
          <Badge variant="blue" label={tag} />
          <Text type="supporting" hasTabularNumbers>{years(f, isEn)}</Text>
        </HStack>
        <Text weight="semibold"><Title f={f} isEn={isEn} /></Text>
        <div style={{ marginTop: "auto" }}><Meta items={meta} /></div>
      </VStack>
    </ClickableCard>
  );
}

export function FundsView({ funds, lang }: { funds: Funds; lang: Lang }) {
  const isEn = lang === "en";
  const unit = isEn ? "" : "件";
  return (
    <div className="container" style={{ paddingBlock: "16px 96px" }}>
      <VStack gap={10}>
        <section>
          <div style={{ marginBottom: 16 }}>
            <SectionHeader
              title={isEn ? "Principal Investigator" : "研究代表者"}
              sub={isEn ? undefined : "Principal Investigator"}
              count={`${funds.pi.length}${unit}`}
            />
          </div>
          <VStack gap={3}>
            {funds.pi.map((f) => <PiCard key={f.number} f={f} isEn={isEn} />)}
          </VStack>
        </section>
        <section>
          <div style={{ marginBottom: 16 }}>
            <SectionHeader
              title={isEn ? "Co-Investigator" : "研究分担者"}
              sub={isEn ? undefined : "Co-Investigator"}
              count={`${funds.co.length}${unit}`}
            />
          </div>
          <div className="two-col" style={{ alignItems: "stretch" }}>
            {funds.co.map((f) => <CoCard key={f.number} f={f} isEn={isEn} />)}
          </div>
        </section>
      </VStack>
    </div>
  );
}
