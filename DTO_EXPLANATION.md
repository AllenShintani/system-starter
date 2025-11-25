# DTO（Data Transfer Object）とは？ - 初心者向け解説

> **注意**: このドキュメントは継続的に更新されます。わからない用語や概念が出てきたら、このドキュメントに追加していきます。

## DTOとは何か？

**DTO = Data Transfer Object（データ転送オブジェクト）**

APIのリクエスト（送信するデータ）とレスポンス（受け取るデータ）の**形（構造）**を定義するものです。

### 簡単な例

レストランで注文するときを想像してください：

```
お客さん → 店員さん: 「ハンバーガー1つ、コーラ1つ」を注文
店員さん → お客さん: 「注文番号123、10分でお持ちします」と返事
```

この「注文」と「返事」の**形**を定義するのがDTOです。

## なぜDTOが必要なのか？

### 問題点：形がバラバラだと...

DTOがないと、こんな問題が起きます：

```typescript
// ❌ 悪い例：形がバラバラ
// 開発者Aが作ったAPI
POST /api/signin
{ "userId": "123" }  // フィールド名が違う！

// 開発者Bが作ったAPI
POST /api/login
{ "clerkUserId": "123" }  // また違う名前！

// フロントエンド開発者：どれを使えばいいの？😵
```

### 解決策：DTOで形を統一

```typescript
// ✅ 良い例：DTOで形を定義
// サインインリクエストのDTO
{
  clerkUserId: string; // 必ずこの名前、必ず文字列
}
```

## 現在のコードでの実装

### 1. Zodスキーマ（バリデーション）

```typescript
// backend/src/dto/signin/signin.dto.ts

// 「サインインリクエスト」の形を定義
export const signinRequestSchema = z.object({
  clerkUserId: z.string(), // clerkUserIdは文字列で必須
});
```

**意味**：

- `clerkUserId`というフィールドが**必須**
- 値は**文字列**でなければならない
- 数字やnullは**エラー**

**実際の使用例**：

```typescript
// ✅ 正しい
signinRequestSchema.parse({ clerkUserId: "user_123" });
// → OK

// ❌ 間違い
signinRequestSchema.parse({ clerkUserId: 123 });
// → エラー！数字はダメ

signinRequestSchema.parse({});
// → エラー！clerkUserIdがない
```

### 2. TypeScript型（型安全性）

```typescript
// Zodスキーマから自動的にTypeScriptの型を生成
export type SigninRequestDto = z.infer<typeof signinRequestSchema>;

// これで以下と同じ意味：
// type SigninRequestDto = {
//   clerkUserId: string;
// }
```

**意味**：

- TypeScriptが「この形のデータだよ」と理解する
- 間違った形のデータを使おうとすると、**コンパイル時にエラー**が出る

**実際の使用例**：

```typescript
// ✅ 正しい
const request: SigninRequestDto = {
  clerkUserId: "user_123",
};

// ❌ 間違い（TypeScriptがエラーを出す）
const request: SigninRequestDto = {
  userId: "user_123", // エラー！clerkUserIdじゃないとダメ
};
```

### 3. OpenAPI定義（API仕様書）

```typescript
// OpenAPI用のスキーマ定義
export const signinRequestOpenApi = {
  type: "object",
  properties: {
    clerkUserId: {
      type: "string",
      description: "Clerk user ID",
    },
  },
  required: ["clerkUserId"],
} as const;
```

**意味**：

- Swagger UI（API仕様書）に表示される
- フロントエンド開発者が「どんなデータを送ればいいか」を確認できる
- 自動でAPIドキュメントが生成される

## 実際のコードでの流れ

### 現在のtRPCコード（移行前）

```typescript
// backend/src/routers/signin.ts

export const signinRouter = t.router({
  signin: t.procedure
    .input(z.object({ clerkUserId: z.string() }))  // ← ここで形を定義
    .mutation(async ({ input, ctx }) => {
      // input には { clerkUserId: string } が入っている
      const { clerkUserId } = input;
      // ... 処理 ...
      return {
        success: true,
        user: { ... },
        redirect: "/",
      };
    }),
});
```

### 移行後のOpenAPIコード（移行後）

```typescript
// これから実装する routes/signin.routes.ts（予定）

// DTOで形を定義（既に作った）
import { signinRequestSchema, signinResponseSchema } from "@/dto/signin";

// Fastifyのルート定義
server.post("/api/signin", {
  schema: {
    body: signinRequestSchema,      // リクエストの形
    response: {
      200: signinResponseSchema,   // レスポンスの形
    },
  },
}, async (request, reply) => {
  // request.body には { clerkUserId: string } が入っている
  const { clerkUserId } = request.body;
  // ... 処理 ...
  return {
    success: true,
    user: { ... },
    redirect: "/",
  };
});
```

## スキーマ駆動開発とは？

**スキーマ駆動開発 = データの形（スキーマ）を中心に開発する方法**

### 流れ：db → zod → dto → openApi

```
1. データベース（Prisma）
   ↓
   User {
     id: string
     email: string
     userName: string
   }

2. Zodスキーマ（バリデーション）
   ↓
   userDtoSchema = z.object({
     id: z.string(),
     email: z.string(),
     userName: z.string(),
   })

3. DTO（TypeScript型 + OpenAPI定義）
   ↓
   - TypeScript型: UserDto
   - OpenAPI定義: userDtoOpenApi
   - バリデーション: userDtoSchema

4. OpenAPI仕様書
   ↓
   Swagger UIで自動生成されるAPIドキュメント
```

### メリット

1. **型安全性**: TypeScriptが間違いを検出
2. **バリデーション**: 不正なデータを自動で拒否
3. **ドキュメント**: API仕様書が自動生成
4. **一貫性**: 同じスキーマを複数箇所で再利用

## 具体例：User DTO

### ユーザー情報のDTO

```typescript
// backend/src/dto/user/user.dto.ts

// 1. Zodスキーマ（バリデーション）
export const userDtoSchema = z.object({
  id: z.string(), // IDは文字列で必須
  userName: z.string(), // ユーザー名は文字列で必須
  email: z.string(), // メールは文字列で必須
  profilePicture: z.string().nullable(), // プロフィール画像は文字列またはnull
});

// 2. TypeScript型（型安全性）
export type UserDto = z.infer<typeof userDtoSchema>;
// 意味: UserDto = {
//   id: string;
//   userName: string;
//   email: string;
//   profilePicture: string | null;
// }

// 3. OpenAPI定義（API仕様書）
export const userDtoOpenApi = {
  type: "object",
  properties: {
    id: { type: "string" },
    userName: { type: "string" },
    email: { type: "string" },
    profilePicture: { type: "string", nullable: true },
  },
  required: ["id", "userName", "email"],
};
```

### 使用例

```typescript
// ✅ 正しいデータ
const user: UserDto = {
  id: "user_123",
  userName: "田中太郎",
  email: "tanaka@example.com",
  profilePicture: "https://example.com/avatar.jpg",
};

// ✅ プロフィール画像がない場合もOK
const user2: UserDto = {
  id: "user_456",
  userName: "佐藤花子",
  email: "sato@example.com",
  profilePicture: null, // nullもOK
};

// ❌ 間違ったデータ（TypeScriptがエラー）
const user3: UserDto = {
  id: "user_789",
  // userNameがない → エラー！
  email: "yamada@example.com",
};
```

## まとめ

### DTOの役割

1. **データの形を定義**: 「このAPIはこんな形のデータを受け取る/返す」
2. **バリデーション**: 不正なデータを自動で拒否
3. **型安全性**: TypeScriptが間違いを検出
4. **ドキュメント**: API仕様書を自動生成

### スキーマ駆動開発の流れ

```
データベース → Zodスキーマ → DTO → OpenAPI仕様書
     ↓            ↓          ↓         ↓
   Prisma      バリデーション  型定義    APIドキュメント
```

### 現在の実装状況

- ✅ Signin DTO: サインイン関連のデータ構造
- ✅ User DTO: ユーザー情報関連のデータ構造
- ✅ Video DTO: ビデオ関連のデータ構造
- ✅ 共通DTO: エラー、ファイルアップロードなど

これらを使って、次は実際のAPIエンドポイント（ルート）を実装します。

## 用語解説：認証ミドルウェアとJWTトークン

### JWTトークンとは？

**JWT = JSON Web Token（JSON形式のトークン）**

ユーザーがログインしたことを証明する「身分証明書」のようなものです。

#### 簡単な例

```
1. ユーザーがログイン
   ↓
2. サーバーが「この人は認証済みです」という証明書（JWTトークン）を発行
   ↓
3. ユーザーはこの証明書をCookieに保存
   ↓
4. 次回アクセス時に、この証明書を見せて「認証済みです」と証明
```

#### 実際のコード

```typescript
// ログイン時にJWTトークンを発行
const token = request.server.jwt.sign(
  {
    userId: user.id,
    userName: user.userName,
  },
  {
    expiresIn: "7d", // 7日間有効
  },
);

// Cookieに保存
reply.setCookie("token", token, {
  httpOnly: true, // JavaScriptからアクセスできない（セキュリティ）
  secure: true, // HTTPSのみ
});
```

### 認証ミドルウェアとは？

**ミドルウェア = リクエストとレスポンスの間で処理を行う仕組み**

認証ミドルウェアは、「このリクエストは認証済みか？」をチェックする仕組みです。

#### 簡単な例

```
1. ユーザーがAPIを呼び出す
   ↓
2. 認証ミドルウェアが「JWTトークンを持っているか？」をチェック
   ↓
3. 持っていない → エラー（401 Unauthorized）
   持っている → 次の処理に進む
```

#### 実際のコード

```typescript
// backend/src/middleware/auth.middleware.ts

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<JwtPayload> => {
  // 1. CookieからJWTトークンを取得
  const token = request.cookies.token;

  // 2. トークンがない → エラー
  if (!token) {
    reply.code(401).send({
      error: "UNAUTHORIZED",
      message: "認証されていません",
    });
    throw new Error("Unauthorized");
  }

  // 3. トークンを検証（偽造されていないか確認）
  try {
    const decoded = request.server.jwt.verify<JwtPayload>(token);
    return decoded; // 検証成功 → ユーザー情報を返す
  } catch (error) {
    // 4. 検証失敗 → エラー
    reply.code(401).send({
      error: "UNAUTHORIZED",
      message: "無効なトークンです",
    });
    throw new Error("Invalid token");
  }
};
```

#### 使用例

```typescript
// 認証が必要なAPIエンドポイント
const getUserHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  // 認証ミドルウェアでJWTトークンを検証
  const decoded = await authenticate(request, reply);

  // 検証成功 → ユーザーIDが取得できる
  const userId = decoded.userId;

  // ユーザー情報を取得
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user;
};
```

### tRPCルーターとは？

**tRPC = TypeScript RPC（TypeScript用のリモートプロシージャコール）**

tRPCは、TypeScript専用のAPI通信方法です。型安全性が高いのが特徴です。

#### 現在のtRPCコード（移行前）

```typescript
// backend/src/routers/user.ts

export const userRouter = t.router({
  getUser: t.procedure.query(async ({ ctx }) => {
    // 1. CookieからJWTトークンを取得
    const token = ctx.request.cookies.token;
    if (!token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "認証されていません",
      });
    }

    // 2. JWTトークンを検証
    const decoded = ctx.fastify.jwt.verify<JwtPayload>(token);

    // 3. ユーザー情報を取得
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    return user;
  }),
});
```

**特徴**：

- `t.procedure.query()` という特殊な書き方
- エラーハンドリングが `TRPCError` という専用の形式
- フロントエンドからは `trpc.userRouter.getUser.useQuery()` で呼び出す

### OpenAPIベースのFastifyルートとは？

**OpenAPI = APIの仕様を標準化した形式**

**Fastify = Node.js用のWebフレームワーク**

OpenAPIベースのFastifyルートは、標準的なRESTful APIの形式です。

#### 移行後のOpenAPIコード（移行後）

```typescript
// backend/src/routes/user.routes.ts

// GET /api/user
server.get(
  "/api/user",
  {
    schema: {
      description: "認証済みユーザー情報を取得",
      tags: ["user"],
      response: {
        200: getUserResponseSchema, // レスポンスの形を定義
      },
    },
  },
  async (request: FastifyRequest, reply: FastifyReply) => {
    // 1. 認証ミドルウェアでJWTトークンを検証
    const decoded = await authenticate(request, reply);

    // 2. ユーザー情報を取得
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    // 3. レスポンスを返す
    reply.code(200).send(user);
  },
);
```

**特徴**：

- 標準的なHTTPメソッド（GET, POST, PUT, DELETE）
- OpenAPIスキーマでAPI仕様を定義
- Swagger UIで自動的にAPIドキュメントが生成される
- フロントエンドからは `fetch("/api/user")` で呼び出す

### 移行とは？

**移行 = 既存のコードを新しい形式に書き換えること**

#### 移行の流れ

```
1. tRPCルーター（移行前）
   ↓
   - 特殊な書き方（t.procedure.query）
   - TypeScript専用
   - フロントエンドもTypeScript必須

2. OpenAPIベースのFastifyルート（移行後）
   ↓
   - 標準的なRESTful API
   - どの言語からでも呼び出せる
   - Swagger UIで自動ドキュメント生成
```

#### 具体的な変更点

**変更前（tRPC）**：

```typescript
// 認証チェックを毎回手動で書く
const token = ctx.request.cookies.token;
if (!token) {
  throw new TRPCError({ code: "UNAUTHORIZED" });
}
const decoded = ctx.fastify.jwt.verify<JwtPayload>(token);
```

**変更後（OpenAPI + 認証ミドルウェア）**：

```typescript
// 認証ミドルウェアを呼び出すだけ
const decoded = await authenticate(request, reply);
// 認証失敗の場合は、ミドルウェアが自動でエラーレスポンスを返す
```

**メリット**：

- コードがシンプルになる
- 認証ロジックを1箇所に集約できる
- 他のエンドポイントでも同じ認証ミドルウェアを再利用できる

### まとめ

1. **JWTトークン**: ユーザーの認証状態を証明する「身分証明書」
2. **認証ミドルウェア**: JWTトークンをチェックする仕組み
3. **tRPCルーター**: TypeScript専用のAPI通信方法（移行前）
4. **OpenAPIベースのFastifyルート**: 標準的なRESTful API（移行後）
5. **移行**: tRPCからOpenAPIに書き換えること

移行により、コードがシンプルになり、標準的なAPI形式になったため、他のシステムとの連携も容易になります。

---

## サーバーを起動する方法

### サーバーとは？

**サーバー = APIを提供するプログラム**

フロントエンド（ブラウザ）からのリクエストを受け取り、データベースからデータを取得して返すプログラムです。

### 起動の流れ

```
1. データベースを起動（MySQL）
   ↓
2. 環境変数を設定（.envファイル）
   ↓
3. 依存関係をインストール
   ↓
4. データベースの準備（Prisma）
   ↓
5. サーバーを起動
```

### ステップ1: データベースを起動

```bash
# backendディレクトリに移動
cd backend

# Docker ComposeでMySQLを起動
docker-compose up -d
```

**意味**：

- `docker-compose up -d`: Dockerコンテナをバックグラウンドで起動
- MySQLデータベースが起動する

**確認方法**：

```bash
# コンテナが起動しているか確認
docker-compose ps
```

### ステップ2: 環境変数を設定

**環境変数 = サーバーの設定値**

`.env`ファイルに設定を書きます。

```bash
# backendディレクトリで.envファイルを作成
cd backend
cp .env.example .env  # もし.env.exampleがあれば
```

**必要な環境変数**（`.env`ファイルに書く）：

```env
# サーバーの設定
NODE_ENV=development
PORT=3001

# データベースの設定
DATABASE_URL="mysql://user:password@localhost:3306/database_name"

# JWT（認証）の設定
JWT_SECRET="your-secret-key-here"

# CORS（フロントエンドとの通信）の設定
CORS_ORIGIN="http://localhost:3000"

# AWS（S3）の設定
AWS_REGION="ap-northeast-1"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
S3_BUCKET_NAME="your-bucket-name"

# Stripe（決済）の設定
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-webhook-secret"

# Clerk（認証）の設定
CLERK_SECRET_KEY="your-clerk-secret-key"
```

**注意**：

- 実際の値に置き換える必要があります
- `.env`ファイルはGitにコミットしない（機密情報を含むため）

### ステップ3: 依存関係をインストール

```bash
# backendディレクトリで
cd backend
npm install
```

**意味**：

- `package.json`に書かれたパッケージをインストール
- 必要なライブラリをダウンロード

### ステップ4: データベースの準備

```bash
# Prismaクライアントを生成
npx prisma generate

# データベースのテーブルを作成（マイグレーション）
npx prisma migrate dev

# 初期データを投入（オプション）
npm run seed
```

**意味**：

- `prisma generate`: データベースの型定義を生成
- `prisma migrate dev`: データベースにテーブルを作成
- `npm run seed`: テスト用のデータを投入

### ステップ5: サーバーを起動

#### 開発モード（推奨）

```bash
# backendディレクトリで
cd backend
npm run dev
```

**意味**：

- サーバーが起動する
- コードを変更すると自動で再起動される（ホットリロード）
- `http://localhost:3001` でアクセスできる

**実行例**：

```
🚀 Server listening on port: http://localhost:3001
```

#### 本番モード

```bash
# 1. ビルド（TypeScriptをJavaScriptに変換）
npm run build

# 2. サーバーを起動
npm start
```

**意味**：

- `npm run build`: TypeScriptコードをJavaScriptに変換
- `npm start`: ビルドされたJavaScriptを実行

### サーバーが起動したら

#### 確認方法

1. **ターミナルにメッセージが表示される**

   ```
   🚀 Server listening on port: http://localhost:3001
   ```

2. **ブラウザでアクセス**
   - Swagger UI: `http://localhost:3001/api-docs`
   - APIエンドポイント: `http://localhost:3001/api/signin` など

3. **エラーが出たら**
   - 環境変数が正しく設定されているか確認
   - データベースが起動しているか確認
   - ポート番号が既に使われていないか確認

### よくあるエラーと対処法

#### エラー1: ポートが既に使われている

```
Error: Port 3001 is already in use.
```

**対処法**：

```bash
# 1. 既に起動しているサーバーを停止
# Ctrl+C で停止

# 2. または、別のポート番号を使う
# .envファイルで PORT=3002 に変更
```

#### エラー2: データベースに接続できない

```
Error: Can't reach database server
```

**対処法**：

```bash
# 1. データベースが起動しているか確認
docker-compose ps

# 2. 起動していない場合は起動
docker-compose up -d

# 3. DATABASE_URLが正しいか確認
# .envファイルのDATABASE_URLを確認
```

#### エラー3: 環境変数が見つからない

```
❌ Missing required environment variable: PORT
```

**対処法**：

```bash
# .envファイルが存在するか確認
ls -la backend/.env

# .envファイルに必要な環境変数が全て書かれているか確認
```

### サーバーを停止する方法

```bash
# ターミナルで Ctrl+C を押す
```

**意味**：

- 実行中のサーバーを停止
- データベース接続も切断される

### まとめ

1. **データベースを起動**: `docker-compose up -d`
2. **環境変数を設定**: `.env`ファイルを作成
3. **依存関係をインストール**: `npm install`
4. **データベースの準備**: `npx prisma generate && npx prisma migrate dev`
5. **サーバーを起動**: `npm run dev`

**起動確認**：

- ターミナルに `🚀 Server listening on port: http://localhost:3001` と表示される
- ブラウザで `http://localhost:3001/api-docs` にアクセスできる

---

## Swagger UIとは？

**Swagger UI = OpenAPI仕様書を視覚的に表示するツール**

APIの仕様をブラウザで見やすく表示し、実際にAPIを試すことができるツールです。

### 簡単な例

レストランのメニューを想像してください：

```
普通のメニュー（テキストだけ）
↓
「ハンバーガー 500円」
「コーラ 200円」

Swagger UI（見やすいメニュー）
↓
写真付きメニュー + 注文ボタン
「ハンバーガー 500円 [写真] [注文する]」
「コーラ 200円 [写真] [注文する]」
```

Swagger UIは、APIの「見やすいメニュー」のようなものです。

### なぜSwagger UIが必要なのか？

#### 問題点：API仕様書がテキストだけだと...

```markdown
# API仕様書

## POST /api/signin

リクエスト: { "clerkUserId": "string" }
レスポンス: { "success": true, "user": {...} }
```

**問題**：

- 実際に試せない
- エラーメッセージがわからない
- どんなデータを送ればいいか想像しにくい

#### 解決策：Swagger UIで視覚的に表示

```
ブラウザで開く
↓
http://localhost:3001/api-docs
↓
見やすい画面で：
- 各APIの説明
- リクエストの例
- 「Try it out」ボタンで実際に試せる
- レスポンスの例
```

### 実際の使い方

#### 1. サーバーを起動

```bash
cd backend
npm run dev
```

#### 2. ブラウザで開く

```
http://localhost:3001/api-docs
```

#### 3. Swagger UIの画面

Swagger UIでは、以下のような画面が表示されます：

```
┌─────────────────────────────────────┐
│ System Starter API                  │
│                                     │
│ [signin] 認証関連                   │
│   POST /api/signin                  │
│   POST /api/logout                  │
│   GET /api/auth/check               │
│                                     │
│ [user] ユーザー関連                 │
│   GET /api/user                     │
│   PUT /api/user                     │
│                                     │
│ [video] ビデオ関連                  │
│   GET /api/videos                   │
│   GET /api/videos/:id               │
│   POST /api/videos                  │
│   PUT /api/videos/:id               │
└─────────────────────────────────────┘
```

#### 4. APIを試す

1. **APIをクリック** → 詳細が表示される
2. **「Try it out」ボタンをクリック** → 入力欄が表示される
3. **リクエストデータを入力**
4. **「Execute」ボタンをクリック** → 実際にAPIを呼び出す
5. **レスポンスが表示される**

### 実際のコードでの設定

```typescript
// backend/src/server.ts

// 1. Swaggerプラグインを登録
server.register(fastifySwagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "System Starter API",
      description: "System Starter API Documentation",
      version: "1.0.0",
    },
    tags: [
      { name: "signin", description: "認証関連" },
      { name: "user", description: "ユーザー関連" },
      { name: "video", description: "ビデオ関連" },
    ],
  },
});

// 2. Swagger UIプラグインを登録
server.register(fastifySwaggerUi, {
  routePrefix: "/api-docs", // http://localhost:3001/api-docs でアクセス
  uiConfig: {
    docExpansion: "list", // デフォルトで折りたたみ
    deepLinking: false,
  },
});
```

### Swagger UIでできること

1. **API一覧の確認**
   - すべてのAPIエンドポイントが一覧表示される
   - タグで分類されている（signin, user, video）

2. **API詳細の確認**
   - リクエストの形（DTO）
   - レスポンスの形（DTO）
   - エラーレスポンスの形

3. **実際にAPIを試す**
   - 「Try it out」ボタンで実際にAPIを呼び出せる
   - リクエストデータを入力して送信
   - レスポンスを確認

4. **エラーの確認**
   - 間違ったデータを送ると、エラーメッセージが表示される
   - どんなエラーが返るか確認できる

### 使用例：サインインAPIを試す

1. **Swagger UIを開く**

   ```
   http://localhost:3001/api-docs
   ```

2. **POST /api/signin をクリック**

3. **「Try it out」ボタンをクリック**

4. **リクエストボディを入力**

   ```json
   {
     "clerkUserId": "user_123"
   }
   ```

5. **「Execute」ボタンをクリック**

6. **レスポンスを確認**
   ```json
   {
     "success": true,
     "user": {
       "id": "user_123",
       "email": "test@example.com",
       "name": "Test User",
       "avatarUrl": null
     },
     "redirect": "/"
   }
   ```

### Swagger UIのメリット

1. **視覚的にわかりやすい**: テキストだけの仕様書より理解しやすい
2. **実際に試せる**: ブラウザから直接APIを呼び出せる
3. **自動更新**: コードを変更すると、自動で仕様書が更新される
4. **チーム共有**: フロントエンド開発者も同じ仕様書を見られる

### まとめ

- **Swagger UI**: OpenAPI仕様書を視覚的に表示するツール
- **アクセス方法**: `http://localhost:PORT/api-docs`
- **主な機能**: API一覧、詳細確認、実際にAPIを試す
- **メリット**: 視覚的、実際に試せる、自動更新、チーム共有

---

## 今後の追加予定

このドキュメントは、開発中にわからない用語や概念が出てきた際に、随時追加していきます。

### 追加される可能性がある項目

- OpenAPIスキーマの詳細
- Fastifyのプラグインシステム
- フロントエンドでのAPI呼び出し方法
- その他、開発中に出てくる用語や概念

### 追加方法

新しい用語や概念を説明する際は、以下の形式で追加してください：

```markdown
## [用語名]とは？

### 簡単な説明

[初心者にもわかる簡単な説明]

### 実際のコード

[実際のコード例]

### 使用例

[具体的な使用例]
```

---

## Dockerとは？

**Docker = アプリケーションを動かすための「箱」のようなもの**

プログラムやデータベースを、他の人のパソコンでも同じように動かせるようにするツールです。

### 簡単な例

レストランのキッチンを想像してください：

```
普通の方法：
- 料理人Aのキッチン: ガスコンロ、フライパン、調味料など
- 料理人Bのキッチン: 電気コンロ、鍋、調味料など
→ 環境が違うと、同じレシピでも味が変わる可能性がある

Dockerを使う方法：
- すべての料理人が同じ「キッチンセット」を使う
→ どこでも同じ味の料理が作れる
```

Dockerは、この「キッチンセット」のようなものです。

### なぜDockerが必要なのか？

#### 問題点：環境が違うと動かない

```
開発者Aのパソコン:
- macOS
- MySQL 8.0
- Node.js 18

開発者Bのパソコン:
- Windows
- MySQL 5.7
- Node.js 20

→ 同じコードでも、環境が違うと動かない可能性がある
```

#### 解決策：Dockerで環境を統一

```
Dockerを使う:
- すべての開発者が同じ環境を使う
- 「MySQL 8.0」という箱を用意
- どこでも同じように動く
```

### Dockerの基本的な用語

#### 1. イメージ（Image）

**イメージ = アプリケーションの「設計図」**

レシピのようなものです。

```
MySQL 8.0のイメージ = MySQL 8.0を動かすための設計図
```

#### 2. コンテナ（Container）

**コンテナ = イメージから作られた「実際に動いている箱」**

レシピから作られた実際の料理のようなものです。

```
MySQLのコンテナ = MySQL 8.0が実際に動いている箱
```

#### 3. Docker Compose

**Docker Compose = 複数のコンテナをまとめて管理するツール**

複数の料理を同時に作るためのツールのようなものです。

```
docker-compose.yml =
  - MySQLコンテナを起動
  - 設定をまとめて管理
```

### 実際の使い方

#### ステップ1: Dockerのインストール

**macOSの場合**：

1. Docker Desktopをダウンロード
   - https://www.docker.com/products/docker-desktop/
   - 「Download for Mac」をクリック

2. インストール
   - ダウンロードしたファイルを開く
   - アプリケーションフォルダにDockerをドラッグ&ドロップ

3. 起動
   - アプリケーションフォルダからDockerを起動
   - メニューバーにDockerのアイコンが表示される

4. 確認
   ```bash
   docker --version
   # 例: Docker version 24.0.0
   ```

**Windowsの場合**：

1. Docker Desktopをダウンロード
   - https://www.docker.com/products/docker-desktop/
   - 「Download for Windows」をクリック

2. インストール
   - ダウンロードしたファイルを実行
   - インストールウィザードに従う

3. 起動
   - Docker Desktopを起動
   - システムトレイにDockerのアイコンが表示される

4. 確認
   ```bash
   docker --version
   ```

#### ステップ2: Docker Composeの確認

```bash
# Docker Composeが使えるか確認
docker compose version
# または
docker-compose version
```

**出力例**：

```
Docker Compose version v2.20.0
```

#### ステップ3: データベースを起動

```bash
# backendディレクトリに移動
cd backend

# docker-compose.ymlファイルを確認
cat docker-compose.yml
```

**docker-compose.ymlの内容**：

```yaml
services:
  db:
    image: mysql:8.0 # MySQL 8.0のイメージを使う
    container_name: ${MYSQL_DATABASE}
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD} # パスワード
      MYSQL_DATABASE: ${MYSQL_DATABASE} # データベース名
    volumes:
      - ./mysql_data:/var/lib/mysql # データを保存する場所
    ports:
      - "3306:3306" # ポート番号3306でアクセスできる
```

**データベースを起動**：

```bash
# データベースを起動（バックグラウンドで実行）
docker compose up -d

# 起動確認
docker compose ps
```

**期待される出力**：

```
NAME                STATUS              PORTS
system_starter      Up 2 seconds        0.0.0.0:3306->3306/tcp
```

#### ステップ4: データベースの確認

```bash
# ログを確認（エラーがないか）
docker compose logs db

# データベースに接続（オプション）
docker compose exec db mysql -u root -p
# パスワードを入力（.envファイルのMYSQL_ROOT_PASSWORD）
```

#### ステップ5: データベースを停止

```bash
# データベースを停止
docker compose down

# データとコンテナを削除（注意：データが消えます）
docker compose down -v
```

### よくあるエラーと対処法

#### エラー1: Dockerが起動していない

```
Cannot connect to the Docker daemon
```

**対処法**：

1. Docker Desktopを起動
2. メニューバー（macOS）またはシステムトレイ（Windows）でDockerが起動しているか確認

#### エラー2: ポートが既に使われている

```
Error: bind: address already in use
```

**対処法**：

1. 既にMySQLが起動している可能性がある

   ```bash
   # 既存のコンテナを確認
   docker ps

   # 既存のコンテナを停止
   docker stop <container_id>
   ```

2. または、docker-compose.ymlでポート番号を変更

#### エラー3: 環境変数が見つからない

```
WARNING: The MYSQL_DATABASE variable is not set
```

**対処法**：

1. `.env`ファイルが存在するか確認
2. `.env`ファイルに必要な環境変数が書かれているか確認

### Dockerのメリット

1. **環境の統一**: 誰のパソコンでも同じ環境で動く
2. **簡単なセットアップ**: コマンド1つでデータベースを起動
3. **クリーンな環境**: 削除すれば完全に消える
4. **再現性**: 同じ環境を何度でも作れる

### まとめ

- **Docker**: アプリケーションを動かすための「箱」
- **イメージ**: アプリケーションの「設計図」
- **コンテナ**: 実際に動いている「箱」
- **Docker Compose**: 複数のコンテナをまとめて管理

**データベースを起動する手順**：

1. Docker Desktopをインストール・起動
2. `docker compose up -d` でデータベースを起動
3. `docker compose ps` で起動確認
4. `docker compose down` で停止

---
