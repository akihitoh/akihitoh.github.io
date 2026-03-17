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

**Navigation の二重管理に注意**:
- `_config.yml` の `header_pages` — minima テーマのヘッダーリンク順序を制御
- `_data/navigation.yml` — カスタムナビゲーション構造を定義

新しいページを追加する場合は**両方**を更新する必要がある。

**Content Pages**:
- `README.md` — Profile homepage（略歴、職歴、学歴、研究テーマ、連絡先）
- `about-en.md` — English profile page（ヘッダーには非表示、README.md からリンク）
- `projects.md` — Research projects with KAKENHI details
- `works.md` — Full publication list（学術論文誌、国際会議、国内会議の3セクション）
- `software.md` — Software tools and datasets
- `funds.md` — Research funding history（研究代表者/分担者の2セクション）
- `media.md` — Media coverage and interviews

**Legacy Files** (`homepage/`):
- 旧サイトの HTML、BibTeX パーサー（`rbib/`）、Bootstrap テンプレート等
- 参照用のアーカイブ。通常は編集不要

**HTML Templates** (unused/draft):
- `publication.html`, `published_papers.html`, `presentations.html`

## Content Guidelines

- Primary language: Japanese（技術用語は英語のまま）
- Publication entries in `works.md`: 番号付きリスト、新しいものを先頭に追加
  - 日本語論文: `著者, "タイトル", 論文誌名, Vol.XX, No.X, pp.XX-XX, 年月.`
  - 英語論文: `Authors, "Title", Conference/Journal, pp.XX-XX, Month Year.`
- Research funding entries in `funds.md`: KAKENHI 課題番号と kaken.nii.ac.jp リンクを含める
- Contact email uses "atmark" instead of "@" for spam prevention