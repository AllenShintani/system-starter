# サーバー起動のクイックガイド

## 最短でサーバーを起動する方法

### 前提条件の確認

```bash
# 1. データベースが起動しているか確認
cd backend
docker compose ps

# 起動していない場合
docker compose up -d
```

### サーバーを起動

```bash
# backendディレクトリで
cd backend
npm run dev
```

### 起動確認

サーバーが起動すると、以下のメッセージが表示されます：

```
🚀 Server listening on port: http://localhost:3001
```

### アクセス

- **Swagger UI**: http://localhost:3001/api-docs
- **APIエンドポイント**: http://localhost:3001/api/auth/check

### サーバーを停止

ターミナルで `Ctrl+C` を押す

---

## 初回セットアップ（まだやっていない場合）

### 1. 環境変数の設定

```bash
cd backend
# .envファイルが存在するか確認
test -f .env && echo "✅ .env exists" || echo "❌ .env missing"

# 存在しない場合は作成（既に作成済みの場合はスキップ）
# .envファイルは既に作成済みです
```

### 2. データベースの起動

```bash
docker compose up -d
docker compose ps  # 起動確認
```

### 3. Prismaのセットアップ

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. 依存関係のインストール

```bash
npm install
```

### 5. サーバーを起動

```bash
npm run dev
```

---

## よくある問題

### ポートが既に使われている

```bash
# 既に起動しているサーバーを停止
lsof -ti:3001 | xargs kill -9

# または、.envファイルでPORTを変更
# PORT=3002
```

### データベースに接続できない

```bash
# データベースが起動しているか確認
docker compose ps

# 起動していない場合
docker compose up -d

# ログを確認
docker compose logs db
```

### Prismaクライアントエラー

```bash
# Prismaクライアントを再生成
npx prisma generate
```

---

## 現在の状態

✅ データベース: 起動中  
✅ 環境変数: 設定済み  
✅ Prisma: セットアップ済み  
✅ 依存関係: インストール済み  

**次のステップ**: `npm run dev` でサーバーを起動してください！

