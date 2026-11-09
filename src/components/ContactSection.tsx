"use client";
import { Card } from "@astryxdesign/core/Card";
import { ClickableCard } from "@astryxdesign/core/ClickableCard";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { KAKEN_URL_JA, RESEARCHMAP_URL } from "@/lib/site";
import { Email } from "./ProfileHero";
import { SectionHeader } from "./ui";

const LINKS = [
  { title: "研究者情報 (researchmap)", sub: "経歴・業績・社会貢献活動の一覧", href: RESEARCHMAP_URL },
  { title: "科研費データベース (KAKEN)", sub: "研究者番号 90506544・研究課題と成果報告", href: KAKEN_URL_JA },
];

export function ContactSection() {
  return (
    <section id="contact" className="container" style={{ paddingBlock: "48px 72px" }}>
      <VStack gap={6}>
        <SectionHeader eyebrow="Contact" title="連絡先・リンク" />
        <div className="two-col">
          <Card padding={6}>
            <VStack gap={2}>
              <Text type="supporting">Email</Text>
              <Heading level={3}>
                <Email />
              </Heading>
              <Text as="p" color="secondary" display="block">
                迷惑メール対策のため表記を変えています。[at] を @ に置き換えて送信してください。
              </Text>
            </VStack>
          </Card>
          <VStack gap={3}>
            {LINKS.map((l) => (
              <ClickableCard key={l.href} label={l.title} href={l.href} target="_blank" padding={5}>
                <HStack justify="between" align="center" gap={3}>
                  <VStack gap={0.5}>
                    <Text weight="semibold">{l.title}</Text>
                    <Text type="supporting">{l.sub}</Text>
                  </VStack>
                  <Icon icon="externalLink" color="secondary" />
                </HStack>
              </ClickableCard>
            ))}
          </VStack>
        </div>
      </VStack>
    </section>
  );
}
