# サイト構成と更新手順（Next.js + Astryx）

## 構成

- **フレームワーク**: Next.js（App Router）を静的書き出し（`output: "export"`）して GitHub Pages で配信
- **UI**: [Astryx](https://github.com/meta/astryx)（Meta 製デザインシステム、MIT）。テーマは `@astryxdesign/theme-neutral`
- **デプロイ**: `main` への push で GitHub Actions（`.github/workflows/deploy.yml`）がビルドして公開
  - リポジトリの Settings → Pages → Source は「GitHub Actions」にしておく
- **ローカル確認**: `docker compose up` → http://localhost:4001（ファイル変更は自動反映）

```
data/                 コンテンツ（YAML と業績データ）
  research.yml        研究テーマ（ホーム日本語・About English で共用）
  cv.yml              職歴・学歴
  activities.yml      受賞・学会活動・所属学会・特許・メディア報道
  funds.yml           研究資金（pi: 研究代表者 / co: 研究分担者）
  publications.ts     研究業績
public/               そのまま公開される静的ファイル（画像・Search Console 確認ファイル）
src/app/(ja)/         日本語ページ（/, /works/, /funds/, /cv/）
src/app/(en)/         英語ページ（/about-en/, /en/publications/, /en/funding/）
src/components/       表示部品（Astryx コンポーネントで構成）
src/lib/site.ts       ナビゲーション・日英ページの対応表・メタデータ生成
```

## よくある更新

- **業績の追加**: `data/publications.ts` の該当カテゴリ・年代の `items` 先頭に 1 行追加
- **研究資金の追加**: `data/funds.yml` に追記（課題番号と KAKEN のリンクを含める）
- **略歴・受賞・学会活動**: `data/cv.yml` / `data/activities.yml`
- **トップの紹介文**: `src/components/ProfileHero.tsx` の `COPY`

## コマンド

```bash
npm run dev      # 開発サーバー（Docker を使わない場合）
npm run lint     # 型チェック
npm run build    # 静的書き出し（out/ に出力）
npm run astryx -- component Button   # Astryx コンポーネントの API を調べる
```

## 補足

- 日本語・英語で `<html lang>` を切り替えるため、ルートレイアウトを `(ja)` / `(en)` のルートグループに分けている
- 404 ページは `src/app/global-not-found.tsx`
- 欧文フォント Figtree は `next/font` でビルド時に取得して自己ホスト。和文は端末標準のゴシック体
- 色は Astryx のトークン（`--color-*`）経由で指定しているため、OS のダークモードにも追従する
