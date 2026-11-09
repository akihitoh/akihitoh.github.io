import { ContactSection } from "@/components/ContactSection";
import { ProfileHero } from "@/components/ProfileHero";
import { ThemeGrid } from "@/components/ThemeGrid";
import { SectionHeader } from "@/components/ui";
import { getResearch } from "@/lib/data";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ lang: "ja", path: "/" });

export default function HomePage() {
  const themes = getResearch();
  return (
    <>
      <ProfileHero lang="ja" />
      <section id="themes" className="container" style={{ paddingBlock: "48px" }}>
        <div style={{ marginBottom: 24 }}>
          <SectionHeader
            eyebrow="Research"
            title="研究テーマ"
            desc="実世界のセンシングと、シミュレーション・最適化・機械学習をつなぐテーマに取り組んでいます。先頭が現在の重点テーマです。"
          />
        </div>
        <ThemeGrid themes={themes} lang="ja" />
      </section>
      <ContactSection />
    </>
  );
}
