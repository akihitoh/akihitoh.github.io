import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import type { Lang } from "@/lib/types";

// ビルド日時を最終更新日として表示する
const BUILT_AT = new Date();

function formatDate(d: Date, lang: Lang): string {
  return lang === "en"
    ? d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Tokyo" })
    : d.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Tokyo" });
}

export function SiteFooter({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  return (
    <footer className="site-footer" style={{ borderTop: "1px solid var(--color-border)" }}>
      <div className="container" style={{ paddingBlock: 28 }}>
        <HStack justify="between" align="center" wrap="wrap" gap={3}>
          <Text weight="semibold">
            {isEn ? "Akihito Hiromori" : "廣森 聡仁"}
            {!isEn && (
              <Text type="supporting"> Akihito Hiromori</Text>
            )}
          </Text>
          <Text type="supporting">
            {isEn ? "Last updated " : "最終更新 "}
            {formatDate(BUILT_AT, lang)} · © {BUILT_AT.getFullYear()} Akihito Hiromori
          </Text>
        </HStack>
      </div>
    </footer>
  );
}
