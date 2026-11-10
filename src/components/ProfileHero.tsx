"use client";
// ホーム・About English 共通のヒーロー。主役は研究内容で、名前は小さなプロフィール行に置く
import { Fragment } from "react";
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
    headline: ["シミュレーションと機械学習による、", "大規模な社会システムの評価と最適化"],
    lede:
      "人の流れや交通、無線通信、衛星コンステレーションといった大規模なシステムを、シミュレーションと機械学習で評価・最適化する研究に取り組んでいます。時間のかかるシミュレーションをニューラルサロゲートで置き換えて施策の効果を素早く見積もる手法、介護送迎や避難経路の計画を数理最適化と機械学習で解く手法、災害時にも機能する LoRa 通信や情報集約の仕組みが主なテーマです。",
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
    headline: ["Evaluating and optimizing large-scale social systems with simulation and machine learning"],
    lede:
      "I evaluate and optimize large-scale systems such as pedestrian and traffic flows, wireless communications and satellite constellations using simulation and machine learning. Main topics include neural surrogate models that replace time-consuming simulations to rapidly estimate the impact of policies, methods combining mathematical optimization and machine learning for nursing-care transport and evacuation route planning, and LoRa communication and information-gathering systems that keep working in disasters.",
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
          <div className="hero-title">
          <Heading level={1} type="display-2" weight="bold" textWrap="pretty">
            {c.headline.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </Heading>
          </div>
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
