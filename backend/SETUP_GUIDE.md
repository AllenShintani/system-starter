# バックエンドセットアップガイド

## 前提条件

- Node.js (v18以上推奨)
- Docker & Docker Compose
- npm または yarn

## セットアップ手順

### 1. 環境変数の設定

```bash
cd backend
cp .env.example .env
```

`.env`ファイルを開いて、実際の値に置き換えてください。

**最低限必要な設定**（動作確認用）：
```env
NODE_ENV=development
PORT=3001
DATABASE_URL="mysql://root:password@localhost:3306/database_name"
JWT_SECRET="test-secret-key-for-development"
CORS_ORIGIN="http://localhost:3000"
AWS_REGION="ap-northeast-1"
AWS_ACCESS_KEY_ID="dummy"
AWS_SECRET_ACCESS_KEY="dummy"
S3_BUCKET_NAME="dummy"
STRIPE_SECRET_KEY="sk_test_dummy"
STRIPE_WEBHOOK_SECRET="whsec_dummy"
CLERK_SECRET_KEY="sk_test_dummy"
MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=database_name
```

### 2. データベースの起動

```bash
# Docker ComposeでMySQLを起動
docker-compose up -d

# 起動確認
docker-compose ps
```

### 3. 依存関係のインストール

```bash
npm install
```

### 4. Prismaのセットアップ

```bash
# Prismaクライアントを生成
npx prisma generate

# データベースマイグレーション（テーブル作成）
npx prisma migrate dev

# 初期データの投入（オプション）
npm run seed
```

### 5. サーバーの起動

```bash
# 開発モードで起動
npm run dev
```

サーバーが起動すると、以下のメッセージが表示されます：
```
🚀 Server listening on port: http://localhost:3001
```

### 6. 動作確認

#### Swagger UIで確認

ブラウザで以下にアクセス：
```
http://localhost:3001/api-docs
```

#### APIエンドポイントの確認

- `GET http://localhost:3001/api/auth/check` - 認証状態確認（認証不要）
- `GET http://localhost:3001/api-docs/json` - OpenAPI仕様（JSON）

## トラブルシューティング

### ポートが既に使われている

```bash
# .envファイルでPORTを変更
PORT=3002
```

### データベースに接続できない

```bash
# Docker Composeの状態を確認
docker-compose ps

# ログを確認
docker-compose logs db

# 再起動
docker-compose restart db
```

### Prismaマイグレーションエラー

```bash
# データベースをリセット（注意：データが消えます）
npx prisma migrate reset

# 再度マイグレーション
npx prisma migrate dev
```

