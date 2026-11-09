import { Link } from "@astryxdesign/core/Link";
import { FundsView } from "@/components/FundsView";
import { PageTitle } from "@/components/ui";
import { getFunds } from "@/lib/data";
import { KAKEN_URL_JA, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ lang: "ja", title: "研究資金", path: "/funds/" });

export default function FundsPage() {
  return (
    <>
      <PageTitle eyebrow="Funding" title="外部研究資金">
        研究代表者・研究分担者として参画した科研費および JST さきがけの研究課題です。各課題の詳細は{" "}
        <Link href={KAKEN_URL_JA} isExternalLink>KAKEN（科研費データベース）</Link> をご覧ください。
      </PageTitle>
      <FundsView funds={getFunds()} lang="ja" />
    </>
  );
}
