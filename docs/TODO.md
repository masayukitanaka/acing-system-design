# Translation TODO List

## 概要

このドキュメントは、「Acing the System Design Interview」の全258章を英語から日本語に翻訳するためのワークフローと進捗管理を記載しています。

## 現在の状況

- ✅ HTMLファイルを258個の個別ファイルに分割完了
- ✅ 言語切り替え機能実装完了
- ✅ チャプタータイトルの日本語翻訳完了
- ✅ 動的コンテンツ読み込み機能実装完了
- 🔄 チャプター本文の翻訳: 1/258 完了 (0.4%)

## 翻訳ワークフロー

### 方法1: 手動翻訳

1. `public/chapters/` から翻訳したいチャプターを選ぶ
2. 該当の `.html` ファイルを開く
3. 内容を翻訳（HTMLタグはそのまま保持）
4. `-ja.html` サフィックスを付けて保存
5. ブラウザで動作確認

### 方法2: AI翻訳API使用（推奨）

以下のいずれかのサービスを使用:
- Google Cloud Translation API
- DeepL API
- OpenAI API (GPT-4)
- Claude API

#### サンプルスクリプト構造

```typescript
// scripts/translateWithAI.ts
async function translateChapter(chapterId: string, apiService: string) {
  const englishPath = `public/chapters/${chapterId}.html`
  const japanesePath = `public/chapters/${chapterId}-ja.html`

  const englishContent = fs.readFileSync(englishPath, 'utf-8')

  // API呼び出し
  const translatedContent = await callTranslationAPI(englishContent, apiService)

  fs.writeFileSync(japanesePath, translatedContent, 'utf-8')
}
```

## 翻訳チェックリスト

### Part 1: 理論編 (58章)

#### Front Matter
- [x] front-matter
- [ ] foreword
- [ ] preface
- [ ] acknowledgments
- [ ] about-this-book
- [ ] about-the-author
- [ ] about-the-cover-illustration

#### Chapter 1: A walkthrough of system design concepts (5章)
- [ ] 1-a-walkthrough-of-system-design-concepts
- [x] 1-1-a-discussion-about-tradeoffs
- [ ] 1-2-should-you-read-this-book-
- [ ] 1-3-overview-of-this-book
- [ ] 1-4-prelude-a-brief-discussion-of-scaling-the-various-services-of-a-system

#### Chapter 2: A typical system design interview flow (9章)
- [ ] 2-a-typical-system-design-interview-flow
- [ ] 2-1-clarify-requirements-and-discuss-tradeoffs
- [ ] 2-2-draft-the-api-specification
- [ ] 2-3-connections-and-processing-between-users-and-data
- [ ] 2-4-design-the-data-model
- [ ] 2-5-logging-monitoring-and-alerting
- [ ] 2-6-search-bar
- [ ] 2-7-other-discussions
- [ ] 2-8-post-interview-reflection-and-assessment
- [ ] 2-9-interviewing-the-company

#### Chapter 3: Non-functional requirements (13章)
- [ ] 3-non-functional-requirements
- [ ] 3-1-scalability
- [ ] 3-2-availability
- [ ] 3-3-fault-tolerance
- [ ] 3-4-performance-latency-and-throughput
- [ ] 3-5-consistency
- [ ] 3-6-accuracy
- [ ] 3-7-complexity-and-maintainability
- [ ] 3-8-cost
- [ ] 3-9-security
- [ ] 3-10-privacy
- [ ] 3-11-cloud-native
- [ ] 3-12-further-reading

#### Chapter 4: Scaling databases (14章)
- [ ] 4-scaling-databases
- [ ] 4-1-brief-prelude-on-storage-services
- [ ] 4-2-when-to-use-vs-avoid-databases
- [ ] 4-3-replication
- [ ] 4-4-scaling-storage-capacity-with-sharded-databases
- [ ] 4-5-aggregating-events
- [ ] 4-6-batch-and-streaming-etl
- [ ] 4-7-denormalization
- [ ] 4-8-caching
- [ ] 4-9-caching-as-a-separate-service
- [ ] 4-10-examples-of-different-kinds-of-data-to-cache-and-how-to-cache-them
- [ ] 4-11-cache-invalidation
- [ ] 4-12-cache-warming
- [ ] 4-13-further-reading

#### Chapter 5: Distributed transactions (9章)
- [ ] 5-distributed-transactions
- [ ] 5-1-event-driven-architecture-eda-
- [ ] 5-2-event-sourcing
- [ ] 5-3-change-data-capture-cdc-
- [ ] 5-4-comparison-of-event-sourcing-and-cdc
- [ ] 5-5-transaction-supervisor
- [ ] 5-6-saga
- [ ] 5-7-other-transaction-types
- [ ] 5-8-further-reading

#### Chapter 6: Common services for functional partitioning (8章)
- [ ] 6-common-services-for-functional-partitioning
- [ ] 6-1-common-functionalities-of-various-services
- [ ] 6-2-service-mesh-sidecar-pattern
- [ ] 6-3-metadata-service
- [ ] 6-4-service-discovery
- [ ] 6-5-functional-partitioning-and-various-frameworks
- [ ] 6-6-library-vs-service
- [ ] 6-7-common-api-paradigms

### Part 2: 実践編 (187章)

#### Chapter 7: Design Craigslist (20章)
- [ ] 7-design-craigslist
- [ ] 7-1-user-stories-and-requirements
- [ ] 7-2-api
- [ ] 7-3-sql-database-schema
- [ ] 7-4-initial-high-level-architecture
- [ ] 7-5-a-monolith-architecture
- [ ] 7-6-using-an-sql-database-and-object-store
- [ ] 7-7-migrations-are-troublesome
- [ ] 7-8-writing-and-reading-posts
- [ ] 7-9-functional-partitioning
- [ ] 7-10-caching
- [ ] 7-11-cdn
- [ ] 7-12-scaling-reads-with-a-sql-cluster
- [ ] 7-13-scaling-write-throughput
- [ ] 7-14-email-service
- [ ] 7-15-search
- [ ] 7-16-removing-old-posts
- [ ] 7-17-monitoring-and-alerting
- [ ] 7-18-summary-of-our-architecture-discussion-so-far
- [ ] 7-19-other-possible-discussion-topics

#### Chapter 8: Design a rate limiting service (14章)
- [ ] 8-design-a-rate-limiting-service
- [ ] 8-1-alternatives-to-a-rate-limiting-service-and-why-they-are-infeasible
- [ ] 8-2-when-not-to-do-rate-limiting
- [ ] 8-3-functional-requirements
- [ ] 8-4-non-functional-requirements
- [ ] 8-5-discuss-user-stories-and-required-service-components
- [ ] 8-6-high-level-architecture
- [ ] 8-7-stateful-approach-sharding
- [ ] 8-8-storing-all-counts-in-every-host
- [ ] 8-9-rate-limiting-algorithms
- [ ] 8-10-employing-a-sidecar-pattern
- [ ] 8-11-logging-monitoring-and-alerting
- [ ] 8-12-providing-functionality-in-a-client-library
- [ ] 8-13-further-reading

#### Chapter 9: Design a notification/alerting service (17章)
- [ ] 9-design-a-notification-alerting-service
- [ ] 9-1-functional-requirements
- [ ] 9-2-non-functional-requirements
- [ ] 9-3-initial-high-level-architecture
- [ ] 9-4-object-store-configuring-and-sending-notifications
- [ ] 9-5-notification-templates
- [ ] 9-6-scheduled-notifications
- [ ] 9-7-notification-addressee-groups
- [ ] 9-8-unsubscribe-requests
- [ ] 9-9-handling-failed-deliveries
- [ ] 9-10-client-side-considerations-regarding-duplicate-notifications
- [ ] 9-11-priority
- [ ] 9-12-search
- [ ] 9-13-monitoring-and-alerting
- [ ] 9-14-availability-monitoring-and-alerting-on-the-notification-alerting-service
- [ ] 9-15-other-possible-discussion-topics
- [ ] 9-16-final-notes

#### Chapter 10: Design a database batch auditing service (14章)
- [ ] 10-design-a-database-batch-auditing-service
- [ ] 10-1-why-is-auditing-necessary-
- [ ] 10-2-defining-a-validation-with-a-conditional-statement-on-a-sql-query-s-result
- [ ] 10-3-a-simple-sql-batch-auditing-service
- [ ] 10-4-requirements
- [ ] 10-5-high-level-architecture
- [ ] 10-6-constraints-on-database-queries
- [ ] 10-7-prevent-too-many-simultaneous-queries
- [ ] 10-8-other-users-of-database-schema-metadata
- [ ] 10-9-auditing-a-data-pipeline
- [ ] 10-10-logging-monitoring-and-alerting
- [ ] 10-11-other-possible-types-of-audits
- [ ] 10-12-other-possible-discussion-topics
- [ ] 10-13-references

#### Chapter 11: Autocomplete/typeahead (13章)
- [ ] 11-autocomplete-typeahead
- [ ] 11-1-possible-uses-of-autocomplete
- [ ] 11-2-search-vs-autocomplete
- [ ] 11-3-functional-requirements
- [ ] 11-4-non-functional-requirements
- [ ] 11-5-planning-the-high-level-architecture
- [ ] 11-6-weighted-trie-approach-and-initial-high-level-architecture
- [ ] 11-7-detailed-implementation
- [ ] 11-8-sampling-approach
- [ ] 11-9-handling-storage-requirements
- [ ] 11-10-handling-phrases-instead-of-single-words
- [ ] 11-11-logging-monitoring-and-alerting
- [ ] 11-12-other-considerations-and-further-discussion

#### Chapter 12: Design Flickr (11章)
- [ ] 12-design-flickr
- [ ] 12-1-user-stories-and-functional-requirements
- [ ] 12-2-non-functional-requirements
- [ ] 12-3-high-level-architecture
- [ ] 12-4-sql-schema
- [ ] 12-5-organizing-directories-and-files-on-the-cdn
- [ ] 12-6-uploading-a-photo
- [ ] 12-7-downloading-images-and-data
- [ ] 12-8-monitoring-and-alerting
- [ ] 12-9-some-other-services
- [ ] 12-10-other-possible-discussion-topics

#### Chapter 13: Design a content distribution network (10章)
- [ ] 13-design-a-content-distribution-network
- [ ] 13-1-advantages-and-disadvantages-of-a-cdn
- [ ] 13-2-requirements
- [ ] 13-3-cdn-authentication-and-authorization
- [ ] 13-4-high-level-architecture
- [ ] 13-5-storage-service
- [ ] 13-6-common-operations
- [ ] 13-7-cache-invalidation
- [ ] 13-8-logging-monitoring-and-alerting
- [ ] 13-9-other-possible-discussions-on-downloading-media-files

#### Chapter 14: Design a text messaging app (11章)
- [ ] 14-design-a-text-messaging-app
- [ ] 14-1-requirements
- [ ] 14-2-initial-thoughts
- [ ] 14-3-initial-high-level-design
- [ ] 14-4-connection-service
- [ ] 14-5-sender-service
- [ ] 14-6-message-service
- [ ] 14-7-message-sending-service
- [ ] 14-8-search
- [ ] 14-9-logging-monitoring-and-alerting
- [ ] 14-10-other-possible-discussion-topics

#### Chapter 15: Design Airbnb (11章)
- [ ] 15-design-airbnb
- [ ] 15-1-requirements
- [ ] 15-2-design-decisions
- [ ] 15-3-high-level-architecture
- [ ] 15-4-functional-partitioning
- [ ] 15-5-create-or-update-a-listing
- [ ] 15-6-approval-service
- [ ] 15-7-booking-service
- [ ] 15-8-availability-service
- [ ] 15-9-logging-monitoring-and-alerting
- [ ] 15-10-other-possible-discussion-topics

#### Chapter 16: Design a news feed (7章)
- [ ] 16-design-a-news-feed
- [ ] 16-1-requirements
- [ ] 16-2-high-level-architecture
- [ ] 16-3-prepare-feed-in-advance
- [ ] 16-4-validation-and-content-moderation
- [ ] 16-5-logging-monitoring-and-alerting
- [ ] 16-6-other-possible-discussion-topics

#### Chapter 17: Design a dashboard of top 10 products (13章)
- [ ] 17-design-a-dashboard-of-top-10-products-on-amazon-by-sales-volume
- [ ] 17-1-requirements
- [ ] 17-2-initial-thoughts
- [ ] 17-3-initial-high-level-architecture
- [ ] 17-4-aggregation-service
- [ ] 17-5-batch-pipeline
- [ ] 17-6-streaming-pipeline
- [ ] 17-7-approximation
- [ ] 17-8-dashboard-with-lambda-architecture
- [ ] 17-9-kappa-architecture-approach
- [ ] 17-10-logging-monitoring-and-alerting
- [ ] 17-11-other-possible-discussion-topics
- [ ] 17-12-references

### Appendices (13章)

#### Appendix A: Monoliths vs Microservices (6章)
- [ ] appendix-a-monoliths-vs-microservices
- [ ] a-1-advantages-of-monoliths
- [ ] a-2-disadvantages-of-monoliths
- [ ] a-3-advantages-of-services
- [ ] a-4-disadvantages-of-services
- [ ] a-5-references

#### Appendix B: OAuth 2.0 & OpenID Connect (8章)
- [ ] appendix-b-oauth-2-0-authorization-and-openid-connect-authentication1
- [ ] b-1-authorization-vs-authentication
- [ ] b-2-prelude-simple-login-cookie-based-authentication
- [ ] b-3-single-sign-on
- [ ] b-4-disadvantages-of-simple-login
- [ ] b-5-oauth-2-0-flow
- [ ] b-6-other-oauth-2-0-flows
- [ ] b-7-openid-connect-authentication

#### Appendix C & D (3章)
- [ ] appendix-c-c4-model
- [ ] appendix-d-two-phase-commit-2pc-
- [ ] index

### Summary Sections
- [ ] part-1-
- [ ] part-2-
- [ ] summary (複数存在)

## 優先順位付け

### フェーズ1: 基礎理論（最優先）
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

## 翻訳品質チェックポイント

- [ ] HTMLタグが正しく保持されているか
- [ ] 画像パス（`/images/...`）が変更されていないか
- [ ] クラス名（`class="c4"` など）が保持されているか
- [ ] 技術用語の一貫性
- [ ] 自然な日本語表現
- [ ] 元の文脈・意図が保たれているか

## 自動化スクリプト（今後の実装候補）

```bash
# 全章を一括翻訳（AIサービス必要）
npm run translate:all

# 特定の章を翻訳
npm run translate:chapter -- 7-design-craigslist

# 翻訳進捗確認
npm run translate:status

# 品質チェック
npm run translate:validate
```

## 進捗追跡

```bash
# 翻訳済みファイル数を確認
ls public/chapters/*-ja.html | wc -l

# 未翻訳ファイルをリスト
for file in public/chapters/*.html; do
  if [[ ! "$file" =~ -ja\.html$ ]]; then
    ja_file="${file%.html}-ja.html"
    if [[ ! -f "$ja_file" ]]; then
      basename "$file" .html
    fi
  fi
done
```

## 貢献方法

1. このTODOリストから未翻訳の章を選ぶ
2. 翻訳を完了する
3. 動作確認を行う
4. チェックボックスを更新する
5. コミット＆プッシュ

## 参考リンク

- [TRANSLATION_GUIDE.md](../TRANSLATION_GUIDE.md) - 詳細な翻訳ガイド
- [README.md](../README.md) - プロジェクト概要
- Google Cloud Translation API ドキュメント
- DeepL API ドキュメント
- OpenAI API ドキュメント

## 注意事項

- 翻訳は必ず `-ja.html` サフィックスを使用
- 元のHTMLファイルは編集しない
- 画像や参照リンクのパスは変更しない
- 技術用語の翻訳は一貫性を保つ
- 定期的にブラウザで確認する

## 更新履歴

- 2026-05-19: TODOリスト作成、翻訳ワークフロー確立
- 2026-05-19: 1-1-a-discussion-about-tradeoffs の日本語翻訳完了
