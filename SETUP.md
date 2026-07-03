# デザイン反映手順（GitHub Pages / Jekyll + minima）

このフォルダ `jekyll/` の中身は、`Home.dc.html` のデザインを **jekyll/minima を上書きする形**で
実サイト（akihitoh.github.io）に反映するための一式です。リポジトリのルートに **同じパスで**
上書きコピーしてください（minima は同名ファイルがあればそちらを優先します）。

## コピーするファイルと配置先

```
jekyll/_config.yml            → _config.yml        （既存を置換・後述の差分のみでも可）
jekyll/index.html             → index.html         （新規・トップ。README.md より優先される）
jekyll/works.html             → works.html         （既存 works.md は削除してよい）
jekyll/funds.html             → funds.html         （既存 funds.md は削除してよい）
jekyll/about-en.html          → about-en.html      （既存 about-en.md は削除してよい）

jekyll/_includes/head.html    → _includes/head.html
jekyll/_includes/header.html  → _includes/header.html
jekyll/_includes/footer.html  → _includes/footer.html

jekyll/_layouts/default.html  → _layouts/default.html
jekyll/_layouts/home.html     → _layouts/home.html
jekyll/_layouts/works.html    → _layouts/works.html
jekyll/_layouts/funds.html    → _layouts/funds.html
jekyll/_layouts/about-en.html → _layouts/about-en.html

jekyll/_data/research.yml     → _data/research.yml
jekyll/_data/funds.yml        → _data/funds.yml
jekyll/_data/cv.yml           → _data/cv.yml

jekyll/assets/css/style.css              → assets/css/style.css
jekyll/assets/js/publications-data.js    → assets/js/publications-data.js
jekyll/assets/js/works.js                → assets/js/works.js
jekyll/assets/img/hiromori.png           → assets/img/hiromori.png   （既存と同じ）
jekyll/assets/img/KAKENHIlogoS.jpg       → assets/img/KAKENHIlogoS.jpg（既存と同じ）
```

## コンテンツの持ち方（今後の更新箇所）

デザインとコンテンツを分離しました。文章・データの更新は基本 `_data/*.yml` を編集するだけです。

- **研究テーマ** … `_data/research.yml`（日本語トップと英語Aboutで共用。日本語＝`ja`/`tags`、英語＝`en_title`/`en_desc`）
- **外部研究資金** … `_data/funds.yml`（`pi:` 研究代表者 / `co:` 研究分担者）
- **経歴・学歴(英語)** … `_data/cv.yml`
- **研究業績** … `assets/js/publications-data.js`
  - カテゴリ（`journal` / `intl` / `domestic`）→ 年代グループ → 各エントリ（引用文字列）の配列。
  - **新しい業績は各 `items:` 配列の先頭に1行追加**するだけ。検索・カテゴリ絞り込み・年代折りたたみは自動。
- トップのプロフィール文・連絡先など単発の文言は各 `_layouts/*.html` に直接記載しています。

> 注: 旧 `works.md` は業績の唯一の出典ではなくなります。業績は `publications-data.js` が出典です。
> どちらか一方に統一してください（このセットは JS データ側に統一しています）。

## ナビゲーションについて

ナビは `_includes/header.html` で独自定義しています（`page.lang == 'en'` で英語ナビに切替）。
そのため **`_config.yml` の `header_pages` と `_data/navigation.yml` の二重管理は不要**になりました。
`_data/navigation.yml` は使われないので残しても消しても構いません。

## 確認と公開

```bash
docker compose up          # http://localhost:4001 で確認
git add -A && git commit -m "Apply new design (minima override)"
git push origin main       # GitHub Pages が自動ビルド → https://akihitoh.github.io/
```

## 補足
- フォントは Google Fonts（Zen Old Mincho / Zen Kaku Gothic New / Newsreader）を `_includes/head.html` で読込。
- 配色・余白・コンポーネントは全て `assets/css/style.css` 冒頭の `:root` 変数で一元管理。
- minima 本体は撤去していません。SEO(`jekyll-seo-tag`)・sitemap 等の下回りはそのまま活用します。
