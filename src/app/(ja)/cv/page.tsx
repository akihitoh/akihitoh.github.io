import { CvCard, PageTitle } from "@/components/ui";
import { getActivities, getCv } from "@/lib/data";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ lang: "ja", title: "略歴・活動", path: "/cv/" });

export default function CvPage() {
  const cv = getCv();
  const act = getActivities();
  const current = "現職";
  return (
    <>
      <PageTitle eyebrow="Career" title="略歴・活動">
        職歴・学歴に加え、受賞、特許、学会活動、メディア報道をまとめています。
      </PageTitle>
      <div className="container" style={{ paddingBlock: "16px 96px", display: "grid", gap: 16 }}>
        <div className="two-col">
          <CvCard
            currentLabel={current}
            sections={[{ title: "職歴", rows: cv.appointments.map((a) => ({ when: a.ja_when, what: a.ja, current: a.current })) }]}
          />
          <CvCard
            currentLabel="最終学位"
            sections={[{ title: "学歴・学位", rows: cv.education.map((e) => ({ when: e.ja_when, what: e.ja, current: e.current })) }]}
          />
        </div>
        <div className="two-col">
          <CvCard
            currentLabel={current}
            sections={[
              { title: "受賞", rows: act.awards.map((a) => ({ when: a.when, what: `${a.org} ${a.title}`, sub: a.note })) },
              { title: "特許", rows: act.patents.map((p) => ({ when: p.when, what: p.title, sub: `${p.number}・出願人 ${p.applicant}` })) },
              { title: "メディア報道", rows: act.media.map((m) => ({ when: m.when, what: m.title, sub: m.org })) },
            ]}
          />
          <CvCard
            currentLabel={current}
            sections={[
              { title: "学会活動", rows: act.committees.map((c) => ({ when: c.when, what: `${c.org} ${c.title}` })) },
              { title: "所属学会", rows: act.memberships.map((m) => ({ when: m.when, what: m.title })) },
            ]}
          />
        </div>
      </div>
    </>
  );
}
