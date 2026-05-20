# Translation Setup Guide

このガイドでは、「Acing the System Design Interview」の日本語翻訳作業の開始方法を説明します。

## セットアップ手順

### 1. 環境変数の設定

1. プロジェクトのルートディレクトリに `.env` ファイルを作成します:

```bash
cp .env.example .env
```

2. `.env` ファイルを編集して、あなたのAnthropic API Keyを設定します:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

Anthropic API Keyは以下から取得できます:
https://console.anthropic.com/

### 2. 依存関係のインストール

すでにインストール済みですが、念のため確認:

```bash
npm install
```

## 翻訳コマンド

### 現在の翻訳状況を確認

```bash
npm run translate:status
```

これにより、以下の情報が表示されます:
- 総チャプター数
- 翻訳済みチャプター数
- 残りのチャプター数
- 進捗率

### フェーズ1の翻訳を実行（推奨）

基礎理論（Chapter 1-3）の翻訳を開始:

```bash
npm run translate phase1
```

これにより、以下の32章が翻訳されます:
- Front matter (6章)
- Chapter 1: A walkthrough of system design concepts (4章)
- Chapter 2: A typical system design interview flow (9章)
- Chapter 3: Non-functional requirements (13章)

### 単一チャプターの翻訳

特定のチャプターのみを翻訳したい場合:

```bash
npm run translate single <chapter-id>
```

例:
```bash
npm run translate single foreword
npm run translate single 2-1-clarify-requirements-and-discuss-tradeoffs
```

### 複数の特定チャプターを翻訳

```bash
npm run translate list foreword preface acknowledgments
```

## 翻訳の仕組み

1. **入力**: `public/chapters/<chapter-id>.html`
2. **処理**: Claude Sonnet 4.5による高品質な技術翻訳
3. **出力**: `public/chapters/<chapter-id>-ja.html`

### 翻訳品質の保証

翻訳スクリプトは以下を保証します:
- すべてのHTMLタグと構造を保持
- 画像パスやリンクを変更しない
- 技術用語の一貫した翻訳
- 自然で読みやすい日本語
- です・ます調での統一

### レート制限への配慮

スクリプトには以下の機能が組み込まれています:
- 各翻訳後に1秒の待機
- バッチ処理間に3秒の待機
- バッチサイズ: 3チャプター

これにより、API制限に引っかかりにくくなっています。

## 翻訳の優先順位

### フェーズ1: 基礎理論（最優先） ← 今ここ
Chapter 1-3の全セクション（重要度: 高）

### フェーズ2: データベース＆分散システム
Chapter 4-6の全セクション（重要度: 高）

### フェーズ3: 実践例（人気トピック）
- Chapter 7: Craigslist
- Chapter 14: Text messaging app
- Chapter 15: Airbnb
（重要度: 中〜高）

### フェーズ4: 特殊トピック
- Chapter 8: Rate limiting
- Chapter 9: Notification service
- Chapter 11: Autocomplete
（重要度: 中）

### フェーズ5: 残りの実践例
Chapter 10, 12, 13, 16, 17（重要度: 中）

### フェーズ6: 付録
Appendix A-D（重要度: 低）

## トラブルシューティング

### API Keyエラー

```
Error: Could not resolve authentication method
```

→ `.env` ファイルが正しく設定されているか確認してください。

### レート制限エラー

もしレート制限に達した場合は、スクリプト内の `batchSize` を小さくするか、待機時間を長くしてください:

```typescript
// scripts/translateContent.ts
translateMultipleChapters(phase1Chapters, {
  skipExisting: true,
  batchSize: 1,  // 1に変更
})
```

### 翻訳品質の確認

翻訳後は必ずブラウザで確認してください:

```bash
npm run dev
```

そして http://localhost:5173 にアクセスして、言語を日本語に切り替えます。

## コミット前のチェックリスト

- [ ] 翻訳されたHTMLファイルが正しく生成されている
- [ ] ブラウザで表示を確認した
- [ ] HTMLタグが壊れていない
- [ ] 画像が正しく表示される
- [ ] リンクが機能する
- [ ] TODO.mdのチェックボックスを更新した

## 参考資料

- [TODO.md](docs/TODO.md) - 詳細なチェックリスト
- [TRANSLATION_GUIDE.md](TRANSLATION_GUIDE.md) - 翻訳ガイドライン（もし存在すれば）
- [Anthropic API Documentation](https://docs.anthropic.com/)

## 質問・問題報告

翻訳作業に関する質問や問題がある場合は、GitHubのIssuesで報告してください。
