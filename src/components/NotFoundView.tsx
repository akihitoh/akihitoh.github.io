"use client";
import { Button } from "@astryxdesign/core/Button";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { HStack } from "@astryxdesign/core/HStack";

export function NotFoundView() {
  return (
    <div className="container" style={{ paddingBlock: "96px" }}>
      <EmptyState
        headingLevel={1}
        title="ページが見つかりません / Page not found"
        description="URL が変更されたか、ページが削除された可能性があります。"
        actions={
          <HStack gap={2} wrap="wrap" justify="center">
            <Button label="ホームへ" href="/" variant="primary" />
            <Button label="English" href="/about-en/" variant="secondary" />
          </HStack>
        }
      />
    </div>
  );
}
