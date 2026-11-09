# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Academic portfolio website for Dr. Akihito Hiromori (廣森 聡仁), Associate Professor at Osaka University D3 Center and Graduate School of Information Science and Technology. Next.js（App Router）を静的書き出しし、GitHub Actions 経由で GitHub Pages に公開する。UI は Astryx（`@astryxdesign/core` + `@astryxdesign/theme-neutral`）。

## Development Workflow

```bash
# ローカルプレビュー（Node コンテナで next dev）
docker compose up
# http://localhost:4001 で確認（ファイル変更は自動反映）

npm run lint     # 型チェック（tsc --noEmit）
npm run build    # 静的書き出し（out/）。push 前に通ることを確認する

# main に push すると .github/workflows/deploy.yml がビルド・公開
git push origin main
# https://akihitoh.github.io/ で確認
```

## Site Architecture

- **ルート**: `src/app/(ja)/`（`/`, `/works/`, `/funds/`, `/cv/`）と `src/app/(en)/`（`/about-en/`, `/en/publications/`, `/en/funding/`）。`<html lang>` を分けるためルートレイアウトが 2 つある。404 は `src/app/global-not-found.tsx`、サイトマップは `src/app/sitemap.ts`
- **ページ本体**（`page.tsx`）はサーバー側でデータを読み、表示は `src/components/` のクライアントコンポーネント（`"use client"`）が Astryx で描画する。Astryx の多くのコンポーネントは client 専用なので、ページから直接使う場合も client コンポーネント経由にする
- **共通設定** `src/lib/site.ts`: ナビゲーション（`NAV`）、日英ページの対応表（`ALT_PATHS`。言語切り替えと hreflang に使用）、`pageMetadata()`（title / canonical / OGP）
- **スタイル**: `src/app/globals.css`。色は Astryx のトークン（`--color-text-secondary` など）を使い、ダークモードに追従させる。独自の色をハードコードしない
- **Astryx の API 確認**: `npm run astryx -- component <Name>`（props 一覧）

**Data Files**（`data/`）:
- `research.yml` — 研究テーマ（ホーム日本語 + About English で共用。先頭が重点テーマで全幅表示）
- `funds.yml` — 研究資金（`pi`: 研究代表者 / `co`: 研究分担者）。`en_title` は KAKEN の英語題目、英語題目がない課題は和訳し `en_translated: true`
- `cv.yml` — 略歴（appointments / education。日本語 `ja_when`/`ja` は `/cv/`、英語 `when`/`en` は About English）
- `activities.yml` — 受賞・学会活動（委員歴）・所属学会・特許・メディア報道（`en_` キーは About English）
- `publications.ts` — 研究業績（業績ページで検索・絞り込み）
- 読み込みは `src/lib/data.ts`、型は `src/lib/types.ts`

**Static Files**（`public/`）: 画像（`public/assets/img/`。SNS 共有画像 `og.png`、`favicon.svg`）と Search Console 確認ファイル

**Non-published Files**:
- `README.md` — リポジトリ説明用
- `SETUP.md` — 構成と更新手順のメモ
- `_preview/` — 旧デザインのプレビュー
- `homepage/` — 旧サイトのアーカイブ（通常は編集不要）

## Content Guidelines

- Primary language: Japanese（技術用語は英語のまま）
- 業績の追加は `data/publications.ts` の該当カテゴリ（journal / intl / domestic）の該当 era グループ（5年単位: `2025–`, `2020–2024`, …）先頭に追加
  - DOI がある場合は ``{ c: `引用文字列`, doi: "10.xxxx/..." }``（引用文字列はバッククォートで囲む）の形で書く（DOI バッジが付く）
  - 日本語論文: `著者, "タイトル", 論文誌名, Vol.XX, No.X, pp.XX-XX, 年月.`
  - 英語論文: `Authors, "Title", Conference/Journal, pp.XX-XX, Month Year.`
- 研究資金の追加は `data/funds.yml`: KAKENHI 課題番号と kaken.nii.ac.jp リンクを含める
- Contact email uses "atmark" instead of "@" for spam prevention