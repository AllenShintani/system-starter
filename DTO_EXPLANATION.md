# DTO（Data Transfer Object）とは？ - 初心者向け解説

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
  clerkUserId: string  // 必ずこの名前、必ず文字列
}
```

## 現在のコードでの実装

### 1. Zodスキーマ（バリデーション）

```typescript
// backend/src/dto/signin/signin.dto.ts

// 「サインインリクエスト」の形を定義
export const signinRequestSchema = z.object({
  clerkUserId: z.string(),  // clerkUserIdは文字列で必須
});
```

**意味**：
- `clerkUserId`というフィールドが**必須**
- 値は**文字列**でなければならない
- 数字やnullは**エラー**

**実際の使用例**：
```typescript
// ✅ 正しい
signinRequestSchema.parse({ clerkUserId: "user_123" })
// → OK

// ❌ 間違い
signinRequestSchema.parse({ clerkUserId: 123 })
// → エラー！数字はダメ

signinRequestSchema.parse({})
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
  clerkUserId: "user_123"
};

// ❌ 間違い（TypeScriptがエラーを出す）
const request: SigninRequestDto = {
  userId: "user_123"  // エラー！clerkUserIdじゃないとダメ
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
  id: z.string(),              // IDは文字列で必須
  userName: z.string(),        // ユーザー名は文字列で必須
  email: z.string(),           // メールは文字列で必須
  profilePicture: z.string().nullable(),  // プロフィール画像は文字列またはnull
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
  profilePicture: "https://example.com/avatar.jpg"
};

// ✅ プロフィール画像がない場合もOK
const user2: UserDto = {
  id: "user_456",
  userName: "佐藤花子",
  email: "sato@example.com",
  profilePicture: null  // nullもOK
};

// ❌ 間違ったデータ（TypeScriptがエラー）
const user3: UserDto = {
  id: "user_789",
  // userNameがない → エラー！
  email: "yamada@example.com"
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

