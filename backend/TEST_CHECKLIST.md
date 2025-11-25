# バックエンド動作確認チェックリスト

## 事前準備

### ✅ 1. 環境変数の確認

```bash
cd backend
# .envファイルが存在するか確認
test -f .env && echo "✅ .env exists" || echo "❌ .env missing"
```

`.env`ファイルがない場合は：
```bash
cp .env.example .env
# .envファイルを編集して実際の値を設定
```

### ✅ 2. データベースの起動確認

```bash
# Docker ComposeでMySQLを起動
docker-compose up -d

# 起動確認
docker-compose ps

# ログ確認（エラーがないか）
docker-compose logs db
```

### ✅ 3. Prismaのセットアップ確認

```bash
# Prismaクライアントの生成
npx prisma generate

# マイグレーションの確認
npx prisma migrate status

# 必要に応じてマイグレーション実行
npx prisma migrate dev
```

## 動作確認

### ✅ 4. サーバーの起動確認

```bash
# 開発モードで起動
npm run dev
```

**期待される出力**：
```
🚀 Server listening on port: http://localhost:3001
```

**エラーが出た場合**：
- 環境変数が正しく設定されているか確認
- ポート番号が既に使われていないか確認
- データベースに接続できるか確認

### ✅ 5. Swagger UIの確認

ブラウザで以下にアクセス：
```
http://localhost:3001/api-docs
```

**確認項目**：
- [ ] Swagger UIが表示される
- [ ] すべてのAPIエンドポイントが表示される
  - [ ] POST /api/signin
  - [ ] POST /api/logout
  - [ ] GET /api/auth/check
  - [ ] GET /api/user
  - [ ] PUT /api/user
  - [ ] GET /api/videos
  - [ ] GET /api/videos/:id
  - [ ] POST /api/videos
  - [ ] PUT /api/videos/:id
- [ ] 各APIの説明が表示される
- [ ] リクエスト/レスポンスのスキーマが表示される

### ✅ 6. OpenAPI仕様の確認

ブラウザで以下にアクセス：
```
http://localhost:3001/api-docs/json
```

**確認項目**：
- [ ] JSON形式でOpenAPI仕様が表示される
- [ ] operationIdがすべて定義されている
- [ ] スキーマが正しく定義されている

### ✅ 7. APIエンドポイントの動作確認

#### 7.1 認証不要のエンドポイント

**GET /api/auth/check**（認証状態確認）

```bash
# ターミナルから
curl http://localhost:3001/api/auth/check
```

**期待されるレスポンス**：
```json
{
  "authenticated": false,
  "user": null,
  "redirect": "/signin"
}
```

#### 7.2 認証が必要なエンドポイント

**GET /api/user**（ユーザー情報取得）

```bash
# 認証なしでアクセス（エラーになることを確認）
curl http://localhost:3001/api/user
```

**期待されるレスポンス**：
```json
{
  "error": "UNAUTHORIZED",
  "message": "認証されていません"
}
```

### ✅ 8. OpenAPI検証ツールの実行

```bash
# OpenAPI仕様をダウンロード
curl http://localhost:3001/api-docs/json -o openapi.json

# 検証ツールでチェック
npm run validate:openapi openapi.json
```

**期待される結果**：
```
✅ OpenAPI schema is valid
```

## 問題が発生した場合

### エラー1: 環境変数が見つからない

```
❌ Missing required environment variable: PORT
```

**対処法**：
1. `.env`ファイルが存在するか確認
2. `.env`ファイルに必要な環境変数が全て書かれているか確認
3. サーバーを再起動

### エラー2: データベースに接続できない

```
Error: Can't reach database server
```

**対処法**：
1. Docker Composeが起動しているか確認
   ```bash
   docker-compose ps
   ```
2. データベースのログを確認
   ```bash
   docker-compose logs db
   ```
3. DATABASE_URLが正しいか確認

### エラー3: ポートが既に使われている

```
Error: Port 3001 is already in use.
```

**対処法**：
1. 既に起動しているサーバーを停止（Ctrl+C）
2. または、`.env`ファイルでPORTを変更

### エラー4: Prismaマイグレーションエラー

**対処法**：
```bash
# マイグレーション状態を確認
npx prisma migrate status

# 必要に応じてリセット（注意：データが消えます）
npx prisma migrate reset

# 再度マイグレーション
npx prisma migrate dev
```

## 次のステップ

動作確認が完了したら：
1. ✅ バックエンドAPIの動作確認（Swagger UIでテスト）
2. ⏳ フロントエンドAPIクライアントの実装
3. ⏳ フロントエンドフックの実装

