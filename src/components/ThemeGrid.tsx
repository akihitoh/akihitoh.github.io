"use client";
// 研究テーマのカード一覧。先頭（重点テーマ）は全幅で表示する
import { Badge } from "@astryxdesign/core/Badge";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { StatusDot } from "@astryxdesign/core/StatusDot";
import { Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import { VStack } from "@astryxdesign/core/VStack";
import type { Lang, ResearchTheme } from "@/lib/types";

export function ThemeGrid({ themes, lang }: { themes: ResearchTheme[]; lang: Lang }) {
  const isEn = lang === "en";
  const focusLabel = isEn ? "Current focus" : "現在の重点テーマ";
  return (
    <div className="theme-grid">
      {themes.map((t, i) => (
        <Card key={t.num} padding={i === 0 ? 6 : 5}>
          <VStack gap={3}>
            <HStack gap={2} align="center" wrap="wrap">
              <Badge label={t.num} />
              {i === 0 && (
                <Badge variant="green" label={focusLabel} icon={<StatusDot variant="success" label={focusLabel} />} />
              )}
            </HStack>
            <VStack gap={1}>
              <Heading level={3}>{isEn ? t.en_title : t.ja}</Heading>
              {!isEn && <Text type="supporting">{t.en}</Text>}
            </VStack>
            {isEn ? (
              <Text as="p" color="secondary" display="block">{t.en_desc}</Text>
            ) : (
              <HStack gap={1.5} wrap="wrap">
                {t.tags.map((tag) => (
                  <Token key={tag} label={tag} size="sm" />
                ))}
              </HStack>
            )}
          </VStack>
        </Card>
      ))}
    </div>
  );
}
