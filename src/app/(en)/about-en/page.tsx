import { ProfileHero } from "@/components/ProfileHero";
import { ThemeGrid } from "@/components/ThemeGrid";
import { CvCard, LinkListCard, SectionHeader } from "@/components/ui";
import { getActivities, getCv, getResearch } from "@/lib/data";
import { KAKEN_URL_EN, RESEARCHMAP_URL, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ lang: "en", title: "About", path: "/about-en/" });

export default function AboutEnPage() {
  const cv = getCv();
  const act = getActivities();
  const current = "Current";
  return (
    <>
      <ProfileHero lang="en" />
      <section id="research" className="container" style={{ paddingBlock: 48 }}>
        <div style={{ marginBottom: 24 }}>
          <SectionHeader eyebrow="Research Interests" title="Research areas" />
        </div>
        <ThemeGrid themes={getResearch()} lang="en" />
      </section>
      <section id="cv" className="container" style={{ paddingBlock: "48px 96px", display: "grid", gap: 16 }}>
        <div className="two-col">
          <CvCard
            currentLabel={current}
            sections={[{ eyebrow: "Career", title: "Appointments", rows: cv.appointments.map((a) => ({ when: a.when, what: a.en, current: a.current })) }]}
          />
          <div style={{ display: "grid", gap: 16 }}>
            <CvCard
              currentLabel="Highest degree"
              sections={[{ eyebrow: "Education", title: "Degrees", rows: cv.education.map((e) => ({ when: e.when, what: e.en, current: e.current })) }]}
            />
            <LinkListCard
              title="Links"
              links={[
                { label: "Publications", href: "/en/publications/" },
                { label: "researchmap", href: `${RESEARCHMAP_URL}?lang=en`, external: true },
                { label: "KAKEN database", href: KAKEN_URL_EN, external: true },
                { label: "Research funding", href: "/en/funding/" },
              ]}
            />
          </div>
        </div>
        <div className="two-col">
          <CvCard
            currentLabel={current}
            sections={[{ eyebrow: "Recognition", title: "Awards", rows: act.awards.map((a) => ({ when: a.en_when, what: a.en_title, sub: a.note })) }]}
          />
          <CvCard
            currentLabel={current}
            sections={[
              {
                eyebrow: "Service",
                title: "Professional Service",
                rows: [
                  ...act.committees.map((c) => ({ when: c.en_when, what: c.en_title })),
                  ...act.memberships.map((m) => ({ when: m.en_when, what: `Member, ${m.en_title}` })),
                ],
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
