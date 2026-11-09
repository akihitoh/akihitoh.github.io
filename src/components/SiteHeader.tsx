"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { TopNav, TopNavHeading, TopNavItem } from "@astryxdesign/core/TopNav";
import { Button } from "@astryxdesign/core/Button";
import { Icon } from "@astryxdesign/core/Icon";
import { MobileNav } from "@astryxdesign/core/MobileNav";
import { SideNavItem, SideNavSection } from "@astryxdesign/core/SideNav";
import { Text } from "@astryxdesign/core/Text";
import { NAV, altPathOf } from "@/lib/site";
import type { Lang } from "@/lib/types";

export function SiteHeader({ lang }: { lang: Lang }) {
  const pathname = usePathname() ?? "/";
  const [isOpen, setIsOpen] = useState(false);
  const items = NAV[lang];
  const altHref = altPathOf(pathname, lang);
  const isEn = lang === "en";
  const home = isEn ? "/about-en/" : "/";
  const name = isEn ? "Akihito Hiromori" : "廣森 聡仁";
  const switchLabel = isEn ? "日本語" : "EN";
  const isSelected = (match?: string) => !!match && pathname.startsWith(match);

  return (
    <header className="site-header">
      <div className="container">
        <TopNav
          label={isEn ? "Main navigation" : "メインナビゲーション"}
          heading={
            <TopNavHeading
              logo={<span className="brand-mark" aria-hidden="true">AH</span>}
              heading={name}
              headingHref={home}
            />
          }
          endContent={
            <>
              <nav className="nav-desktop" aria-label={isEn ? "Pages" : "ページ"}>
                {items.map((it) => (
                  <TopNavItem key={it.href} label={it.label} href={it.href} isSelected={isSelected(it.match)} />
                ))}
                <Button
                  label={switchLabel}
                  href={altHref}
                  variant="primary"
                  size="sm"
                />
              </nav>
              <div className="nav-mobile">
                <Button
                  label={isEn ? "Open menu" : "メニューを開く"}
                  icon={<Icon icon="menu" />}
                  isIconOnly
                  variant="ghost"
                  onClick={() => setIsOpen(true)}
                />
              </div>
            </>
          }
        />
      </div>
      <MobileNav isOpen={isOpen} onOpenChange={setIsOpen} header={<Text weight="semibold">{name}</Text>} side="end">
        <SideNavSection title={isEn ? "Pages" : "ページ"}>
          {items.map((it) => (
            <SideNavItem key={it.href} label={it.label} href={it.href} isSelected={isSelected(it.match)} />
          ))}
          <SideNavItem label={isEn ? "日本語ページ" : "English"} href={altHref} />
        </SideNavSection>
      </MobileNav>
    </header>
  );
}
