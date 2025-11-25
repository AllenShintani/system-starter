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

## 今後の追加予定

このドキュメントは、開発中にわからない用語や概念が出てきた際に、随時追加していきます。

### 追加される可能性がある項目

- OpenAPIスキーマの詳細
- Fastifyのプラグインシステム
- Swagger UIの使い方
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
