import { Link } from "@astryxdesign/core/Link";
import { FundsView } from "@/components/FundsView";
import { PageTitle } from "@/components/ui";
import { getFunds } from "@/lib/data";
import { KAKEN_URL_EN, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ lang: "en", title: "Research Funding", path: "/en/funding/" });

export default function FundingPage() {
  return (
    <>
      <PageTitle eyebrow="Funding" title="Research Funding">
        Grants received as principal investigator or co-investigator (JSPS KAKENHI and JST PRESTO). Details are
        available in the <Link href={KAKEN_URL_EN} isExternalLink>KAKEN database</Link>. Titles marked “translated”
        have no official English title.
      </PageTitle>
      <FundsView funds={getFunds()} lang="en" />
    </>
  );
}
