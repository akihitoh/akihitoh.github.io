"use client";
// ホーム・About English 共通のヒーロー。主役は研究内容で、名前は小さなプロフィール行に置く
import { Avatar } from "@astryxdesign/core/Avatar";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { Lang } from "@/lib/types";

const COPY = {
  ja: {
    name: "廣森 聡仁",
    nameSub: "Akihito Hiromori, Ph.D.",
    role: "大阪大学 D3センター 准教授 · 大学院情報科学研究科 情報ネットワーク学専攻 (兼)准教授",
    headline: "人の動きを考慮した情報システムの設計と評価",
    lede:
      "人・車両・環境の実世界センシングと、シミュレーション・最適化・機械学習を組み合わせた研究に取り組んでいます。近年はニューラルサロゲートによるシミュレーションの高速化、スマートシティにおける最適化、3次元点群センシング、災害時に強いネットワークを中心に研究しています。",
    primary: { label: "研究業績を見る", href: "/works/" },
    secondary: { label: "略歴・活動", href: "/cv/" },
    facts: [
      { label: "専門分野", value: "情報ネットワーク学・モバイルコンピューティング" },
      { label: "学位", value: "博士(工学) 大阪大学・2004年3月" },
      { label: "在籍", value: "大阪大学（2008年4月〜）" },
    ],
  },
  en: {
    name: "Akihito Hiromori",
    nameSub: "廣森 聡仁 · Ph.D. in Engineering",
    role: "Associate Professor, D3 Center, The University of Osaka · Dept. of Information Networking, Graduate School of Information Science and Technology (concurrent)",
    headline: "Information systems that account for human mobility",
    lede:
      "I design and evaluate information systems by combining real-world sensing of people, vehicles and environments with simulation, optimization and machine learning. Current topics include neural surrogate models for simulation, smart-city optimization, 3D point-cloud sensing and disaster-resilient networking.",
    primary: { label: "View publications", href: "/en/publications/" },
    secondary: { label: "CV", href: "#cv" },
    facts: [
      { label: "Field", value: "Information Networking · Mobile Computing" },
      { label: "Email", value: "mail" },
      { label: "At Osaka", value: "Since April 2008" },
    ],
  },
} as const;

/** 迷惑メール対策の [at] 表記 */
export function Email() {
  return (
    <>
      hiromori<span className="mail-at">[at]</span>ist.osaka-u.ac.jp
    </>
  );
}

export function ProfileHero({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <section className="container" style={{ paddingBlock: "clamp(40px, 7vw, 72px) clamp(32px, 5vw, 56px)" }}>
      <VStack gap={6}>
        <HStack gap={3} align="center">
          <Avatar src="/assets/img/hiromori.png" name={c.name} size={48} tooltip={false} />
          <VStack gap={0.5}>
            <HStack gap={2} align="center" wrap="wrap">
              <Text weight="semibold">{c.name}</Text>
              <Text type="supporting">{c.nameSub}</Text>
            </HStack>
            <Text type="supporting">{c.role}</Text>
          </VStack>
        </HStack>

        <VStack gap={4}>
          <Heading level={1} type="display-2" weight="bold" textWrap="pretty">
            {c.headline}
          </Heading>
          <Text as="p" type="large" weight="normal" color="secondary" display="block">
            <span className="lede" style={{ display: "block" }}>{c.lede}</span>
          </Text>
        </VStack>

        <div className="no-print">
          <HStack gap={2} wrap="wrap">
            <Button
              label={c.primary.label}
              href={c.primary.href}
              variant="primary"
              size="lg"
              endContent={<Icon icon="chevronRight" />}
            />
            <Button label={c.secondary.label} href={c.secondary.href} variant="secondary" size="lg" />
          </HStack>
        </div>

        <Card padding={0}>
          <dl className="facts" style={{ margin: 0 }}>
            {c.facts.map((f) => (
              <div key={f.label}>
                <dt>
                  <Text type="supporting">{f.label}</Text>
                </dt>
                <dd style={{ margin: "4px 0 0" }}>
                  <Text weight="medium">{f.value === "mail" ? <Email /> : f.value}</Text>
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      </VStack>
    </section>
  );
}
