# Message Card Generator

テキストと画像を使ったメッセージカードを作成し、PNG画像としてダウンロードできるWebアプリです。

## 機能

### カード情報の入力
- **タイトル** - 最大30文字
- **宛先（To）** - 受取人名
- **メッセージ本文** - 最大200文字・最大5行、改行対応
- **日付** - mm/dd形式（起動時に今日の日付が自動入力）
- **差出人（Fm）** - 送り主名
- **画像のアップロード** - カード左下に表示（PNG / JPG / WebP、最大5MB）

### デザインのカスタマイズ
- **背景色** - カラーピッカーで自由に設定
- **タイトルフォント** - タイトル専用のフォントを個別指定
- **本文フォント** - To・メッセージ・日付・差出人のフォントを指定
- **文字サイズ** - Title / To / Message / Date / From を個別に調整（8〜60px）

### フォント一覧
| 種別 | フォント |
|------|---------|
| 日本語（Google Fonts） | Noto Sans JP / Noto Serif JP / Klee One / Zen Kaku Gothic New / Shippori Mincho |
| 欧文（システム） | Arial / Georgia / Times New Roman / Verdana / Trebuchet MS / Comic Sans MS / Impact / Courier New |

### 出力
- **リアルタイムプレビュー** - 入力内容がカードに即時反映
- **PNG ダウンロード** - `message-card_YYYY-MM-DD.png` の形式で保存

## カード仕様

- キャンバスサイズ: 450 × 340 px
- 出力形式: PNG

## 技術スタック

- **React 19** + **TypeScript**
- **Vite 7**（開発サーバー・ビルドツール）
- **HTML Canvas API**（カードの描画・エクスポート）
- **Google Fonts**（日本語フォント）

## 開発コマンド

```bash
npm run dev       # 開発サーバー起動（HMR対応）
npm run build     # 本番ビルド（tsc → Vite）
npm run preview   # 本番ビルドのプレビュー
npm run lint      # ESLint 実行
```

## プロジェクト構成

```
src/
├── components/
│   ├── MessageCardForm.tsx   # 入力フォーム
│   ├── CardPreview.tsx       # Canvasプレビュー
│   ├── DownloadButton.tsx    # PNGダウンロードボタン
│   └── ImageUpload.tsx       # 画像アップロード
├── types/
│   └── CardData.ts           # 型定義（CardData, FontSizes など）
├── constants/
│   └── cardConfig.ts         # Canvasレイアウト・フォント設定・デフォルト値
├── utils/
│   ├── canvasRenderer.ts     # Canvas描画ロジック
│   ├── textUtils.ts          # テキスト描画・折り返し処理
│   └── imageUtils.ts         # 画像処理
└── App.tsx                   # ルートコンポーネント
```
