import { Link } from "@astryxdesign/core/Link";
import { PageTitle } from "@/components/ui";
import { WorksView } from "@/components/WorksView";
import { RESEARCHMAP_URL, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ lang: "en", title: "Publications", path: "/en/publications/" });

export default function PublicationsPage() {
  return (
    <>
      <PageTitle eyebrow="Publications" title="Publications">
        Journal articles, international conference papers and domestic (Japanese) conference papers, grouped by category
        and five-year period, newest first. For the latest records, see also{" "}
        <Link href={`${RESEARCHMAP_URL}?lang=en`} isExternalLink>researchmap</Link>.
      </PageTitle>
      <WorksView lang="en" />
    </>
  );
}
