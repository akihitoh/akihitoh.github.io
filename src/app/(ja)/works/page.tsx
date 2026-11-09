import { Link } from "@astryxdesign/core/Link";
import { PageTitle } from "@/components/ui";
import { WorksView } from "@/components/WorksView";
import { RESEARCHMAP_URL, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ lang: "ja", title: "研究業績", path: "/works/" });

export default function WorksPage() {
  return (
    <>
      <PageTitle eyebrow="Publications" title="研究業績一覧">
        学術論文誌・国際会議・国内会議での発表を、カテゴリと5年ごとの年代に分けて新しい順で掲載しています。最新の情報は{" "}
        <Link href={RESEARCHMAP_URL} isExternalLink>researchmap</Link> もあわせてご覧ください。
      </PageTitle>
      <WorksView lang="ja" />
    </>
  );
}
