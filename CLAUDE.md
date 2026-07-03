# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Jekyll-based academic portfolio website for Dr. Akihito Hiromori (廣森 聡仁), Associate Professor at Osaka University D3 Center and Graduate School of Information Science and Technology. Hosted on GitHub Pages via `remote_theme: jekyll/minima`.

## Development Workflow

ローカルに Ruby/Jekyll 環境は持たない。GitHub Pages が Jekyll ビルドを行う。

```bash
# ローカルプレビュー（Docker + github-pages gem で GitHub Pages と同一環境）
docker compose up
# http://localhost:4001 で確認（ファイル変更は自動反映）

# 変更を push すると GitHub Pages が自動ビルド・公開
git push origin main
# https://akihitoh.github.io/ で確認
```

## Site Architecture

カスタムデザイン（minima を `_layouts/`・`_includes/` で全面上書き）。ページ本体は薄い front matter のみで、実体はレイアウトとデータファイルに分離されている。

**Navigation**: `_includes/header.html` に直接定義（日本語/英語で分岐）。`_config.yml` の `header_pages` はテーマ側フォールバックとして残置、`_data/navigation.yml` は未使用。

**Content Pages**（front matter のみ。実体は対応する layout）:
- `index.html` — トップページ（`layout: home`。研究テーマは `_data/research.yml`）
- `works.html` → `/works/` — 業績一覧（`layout: works`。データは `assets/js/publications-data.js`、描画は `assets/js/works.js`）
- `funds.html` → `/funds/` — 研究資金（`layout: funds`。データは `_data/funds.yml` の `pi`/`co`）
- `about-en.html` → `/about-en/` — English profile（`layout: about-en`。データは `_data/cv.yml` と `_data/research.yml`）

**Data Files** (`_data/`):
- `research.yml` — 研究テーマ（ホーム日本語 + About English で共用）
- `funds.yml` — 研究資金（`pi`: 研究代表者 / `co`: 研究分担者）
- `cv.yml` — 英語版 CV（appointments / education）

**Non-published Files**:
- `README.md` — リポジトリ説明用（`exclude` 済み、サイトには出ない）
- `SETUP.md` — デザイン反映手順メモ（`exclude` 済み）
- `_preview/` — デザインプレビュー（アンダースコア始まりのため非公開）
- `homepage/` — 旧サイトのアーカイブ（`exclude` 済み。通常は編集不要）

## Content Guidelines

- Primary language: Japanese（技術用語は英語のまま）
- 業績の追加は `assets/js/publications-data.js` の該当カテゴリ（journal / international / domestic）の該当 era グループ先頭に追加
  - 日本語論文: `著者, "タイトル", 論文誌名, Vol.XX, No.X, pp.XX-XX, 年月.`
  - 英語論文: `Authors, "Title", Conference/Journal, pp.XX-XX, Month Year.`
- 研究資金の追加は `_data/funds.yml`: KAKENHI 課題番号と kaken.nii.ac.jp リンクを含める
- Contact email uses "atmark" instead of "@" for spam prevention