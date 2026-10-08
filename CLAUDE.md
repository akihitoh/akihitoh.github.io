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

カスタムデザイン（minima を `_layouts/`・`_includes/` で全面上書き）。スタイルは `assets/css/site.css`（`style.css` は minima の `style.scss` と出力先が衝突するため使わない）。ページ本体は薄い front matter のみで、実体はレイアウトとデータファイルに分離されている。

**Navigation**: `_includes/header.html` に直接定義（日本語/英語で分岐）。`_config.yml` の `header_pages` はテーマ側フォールバックとして残置、`_data/navigation.yml` は未使用。

**Content Pages**（front matter のみ。実体は対応する layout）:
- `index.html` — トップページ（`layout: home`。研究テーマは `_data/research.yml`。先頭テーマを重点テーマとして全幅表示）
- `works.html` → `/works/` — 業績一覧（`layout: works`。データは `assets/js/publications-data.js`、描画は `assets/js/works.js`）
- `funds.html` → `/funds/` — 研究資金（`layout: funds`。データは `_data/funds.yml` の `pi`/`co`）
- `cv.html` → `/cv/` — 略歴・活動（`layout: cv`。データは `_data/cv.yml` と `_data/activities.yml`）
- `en/publications.html` → `/en/publications/`、`en/funding.html` → `/en/funding/` — 英語版（`lang: en` で works / funds レイアウトを共用）
- 各ページの `alt_url` に対応する他言語ページを書く（言語切り替えボタンと hreflang に使用）
- `about-en.html` → `/about-en/` — English profile（`layout: about-en`。データは `_data/cv.yml`・`_data/activities.yml`・`_data/research.yml`）

**Data Files** (`_data/`):
- `research.yml` — 研究テーマ（ホーム日本語 + About English で共用）
- `funds.yml` — 研究資金（`pi`: 研究代表者 / `co`: 研究分担者）
- `cv.yml` — 略歴（appointments / education。日本語 `ja_when`/`ja` は `/cv/`、英語 `when`/`en` は About English で使用）
- `activities.yml` — 受賞・学会活動（委員歴）・所属学会・特許・メディア報道（日本語は `/cv/`、`en_` キーは About English で表示）
- `funds.yml` の `en_title` は KAKEN の英語題目。英語題目がない課題は和訳し `en_translated: true`
- SNS 共有画像は `assets/img/og.png`（`_config.yml` の `defaults` で全ページに設定）

**Non-published Files**:
- `README.md` — リポジトリ説明用（`exclude` 済み、サイトには出ない）
- `SETUP.md` — デザイン反映手順メモ（`exclude` 済み）
- `_preview/` — デザインプレビュー（アンダースコア始まりのため非公開）
- `homepage/` — 旧サイトのアーカイブ（`exclude` 済み。通常は編集不要）

## Content Guidelines

- Primary language: Japanese（技術用語は英語のまま）
- 業績の追加は `assets/js/publications-data.js` の該当カテゴリ（journal / intl / domestic）の該当 era グループ（5年単位: `2025–`, `2020–2024`, …）先頭に追加
  - DOI がある場合は `{ c: "引用文字列", doi: "10.xxxx/..." }`（引用文字列はバッククォートで囲む） の形で書く（DOI ボタンが付く）
  - 日本語論文: `著者, "タイトル", 論文誌名, Vol.XX, No.X, pp.XX-XX, 年月.`
  - 英語論文: `Authors, "Title", Conference/Journal, pp.XX-XX, Month Year.`
- 研究資金の追加は `_data/funds.yml`: KAKENHI 課題番号と kaken.nii.ac.jp リンクを含める
- Contact email uses "atmark" instead of "@" for spam prevention