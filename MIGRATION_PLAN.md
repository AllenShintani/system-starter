# tRPCからOpenAPIへの移行計画

## 概要

tRPCを完全に廃止し、OpenAPIベースのRESTful APIに置き換えます。
スキーマ駆動開発（db → zod → dto → openApi）を実現し、`zod-to-openapi`を活用します。

## 現状分析

### バックエンド
- **フレームワーク**: Fastify 4.26.2
- **tRPCルーター**: 3つ（signinRouter, userRouter, videoRouter）
- **エンドポイント数**: 合計7つ
  - signinRouter: signin (mutation), logout (mutation), checkAuth (query)
  - userRouter: getUser (query), update (mutation)
  - videoRouter: getAllVideoes (query), getVideo (query), putVideo (mutation), postVideo (mutation)
- **Zodスキーマ**: userUpdateSchema, videoSchema
- **認証**: JWT（Cookie経由）

### フロントエンド
- **フレームワーク**: Next.js 14.2.14
- **tRPC使用箇所**: 6ファイル
  - `providers/TRPCProvider.tsx`
  - `hooks/useAuth.ts`
  - `hooks/useS3Image.ts`
  - `components/admin/VideoUploadAndDisplay.tsx`
  - `components/VideoList.tsx`
  - `app/page.tsx`

## 移行戦略

### フェーズ1: バックエンド基盤の構築

#### 1.1 依存関係の追加
```bash
cd backend
npm install zod-to-openapi @fastify/swagger @fastify/swagger-ui
npm install --save-dev @types/node
```

**追加パッケージ**:
- `zod-to-openapi`: ZodスキーマからOpenAPIスキーマを生成
- `@fastify/swagger`: FastifyでOpenAPI仕様を生成
- `@fastify/swagger-ui`: Swagger UIを提供

#### 1.2 DTO層の構築
**ディレクトリ構造**:
```
backend/src/
  dto/
    index.ts          # DTOのエクスポート
    signin.dto.ts     # サインイン関連のDTO
    user.dto.ts       # ユーザー関連のDTO
    video.dto.ts      # ビデオ関連のDTO
  schemas/
    (既存のZodスキーマを維持)
```

**実装方針**:
- 既存のZodスキーマ（`userUpdateSchema`, `videoSchema`）を再利用
- `zod-to-openapi`を使用してOpenAPIスキーマを生成
- リクエスト/レスポンスのDTOを定義

#### 1.3 OpenAPIルート定義の作成
**ディレクトリ構造**:
```
backend/src/
  routes/
    index.ts          # ルートの登録
    signin.routes.ts  # サインイン関連のルート
    user.routes.ts    # ユーザー関連のルート
    video.routes.ts   # ビデオ関連のルート
```

**エンドポイント設計**:

**Signin Routes**:
- `POST /api/signin` - サインイン
- `POST /api/logout` - ログアウト
- `GET /api/auth/check` - 認証状態確認

**User Routes**:
- `GET /api/user` - ユーザー情報取得
- `PUT /api/user` - ユーザー情報更新

**Video Routes**:
- `GET /api/videos` - ビデオ一覧取得
- `GET /api/videos/:id` - ビデオ詳細取得
- `POST /api/videos` - ビデオ作成
- `PUT /api/videos/:id` - ビデオ更新

#### 1.4 認証ミドルウェアの実装
**ファイル**: `backend/src/middleware/auth.middleware.ts`

**機能**:
- JWTトークンの検証（Cookieから取得）
- 認証が必要なエンドポイントに適用
- 認証情報をリクエストコンテキストに追加

#### 1.5 FastifyへのOpenAPI統合
**ファイル**: `backend/src/server.ts`

**実装内容**:
- `@fastify/swagger`プラグインの登録
- `@fastify/swagger-ui`プラグインの登録
- OpenAPI仕様の生成設定
- tRPCプラグインの削除

### フェーズ2: バックエンド実装

#### 2.1 Signin Routesの実装
**ファイル**: `backend/src/routes/signin.routes.ts`

**実装内容**:
- `POST /api/signin`: Clerk認証後のサインイン処理
- `POST /api/logout`: ログアウト処理（Cookie削除）
- `GET /api/auth/check`: 認証状態確認

**DTO定義**:
```typescript
// Request DTOs
SigninRequestDto: { clerkUserId: string }
LogoutRequestDto: (empty)

// Response DTOs
SigninResponseDto: { success: boolean, user: UserDto, redirect: string }
LogoutResponseDto: { success: boolean, redirect: string }
CheckAuthResponseDto: { authenticated: boolean, user: UserDto | null, redirect: string | null }
```

#### 2.2 User Routesの実装
**ファイル**: `backend/src/routes/user.routes.ts`

**実装内容**:
- `GET /api/user`: 認証済みユーザー情報取得
- `PUT /api/user`: ユーザー情報更新（プロフィール画像アップロード含む）

**DTO定義**:
```typescript
// Request DTOs
UpdateUserRequestDto: { userName?: string, profilePicture?: FileUploadDto }

// Response DTOs
UserDto: { id: string, userName: string, email: string, profilePicture: string | null }
UpdateUserResponseDto: { success: boolean, user: UserDto, signedUrl?: string, profilePictureUrl?: string }
```

#### 2.3 Video Routesの実装
**ファイル**: `backend/src/routes/video.routes.ts`

**実装内容**:
- `GET /api/videos`: ビデオ一覧取得
- `GET /api/videos/:id`: ビデオ詳細取得
- `POST /api/videos`: ビデオ作成
- `PUT /api/videos/:id`: ビデオ更新

**DTO定義**:
```typescript
// Request DTOs
CreateVideoRequestDto: { title: string, description: string, duration: number, videoFile?: FileUploadDto, thumbnailFile?: FileUploadDto }
UpdateVideoRequestDto: CreateVideoRequestDto & { id: string }

// Response DTOs
VideoDto: { id: string, title: string, description: string, videoUrl: string, thumbnailUrl: string, duration: number, createdAt: Date, updatedAt: Date, authorId: string }
CreateVideoResponseDto: { success: boolean, video: VideoDto, videoSignedUrl?: string, thumbnailSignedUrl?: string }
UpdateVideoResponseDto: CreateVideoResponseDto
```

#### 2.4 エラーハンドリングの実装
**ファイル**: `backend/src/utils/errorHandler.ts`

**実装内容**:
- HTTPステータスコードのマッピング
- エラーレスポンスの統一フォーマット
- バリデーションエラーの処理

#### 2.5 tRPC関連コードの削除
**削除対象**:
- `backend/src/routers/` ディレクトリ全体
- `backend/src/utils/createContext.ts`
- `backend/src/utils/verifyAuth.ts` (認証ミドルウェアに置き換え)
- `backend/package.json` の tRPC依存関係

### フェーズ3: フロントエンド実装

#### 3.1 OpenAPIクライアントの実装
**ファイル**: `frontend/src/utils/apiClient.ts`

**実装内容**:
- Fetch APIベースのHTTPクライアント
- 認証トークンの自動付与（Cookie）
- エラーハンドリング
- 型安全なAPI呼び出し

**実装方針**:
```typescript
// 例: APIクライアントの構造
class ApiClient {
  private baseUrl: string;
  
  async get<T>(endpoint: string): Promise<T>;
  async post<T>(endpoint: string, data: unknown): Promise<T>;
  async put<T>(endpoint: string, data: unknown): Promise<T>;
  async delete<T>(endpoint: string): Promise<T>;
}
```

#### 3.2 APIフックの実装
**ファイル**: 
- `frontend/src/hooks/api/useSignin.ts`
- `frontend/src/hooks/api/useUser.ts`
- `frontend/src/hooks/api/useVideo.ts`

**実装内容**:
- React Queryを使用したデータフェッチング
- 各エンドポイント用のカスタムフック
- キャッシュとリフェッチの管理

#### 3.3 既存コンポーネントの置き換え

**置き換え対象**:
1. `hooks/useAuth.ts` - OpenAPIベースの認証フックに置き換え
2. `hooks/useS3Image.ts` - OpenAPIベースのユーザーAPIフックに置き換え
3. `components/VideoList.tsx` - OpenAPIベースのビデオAPIフックに置き換え
4. `components/admin/VideoUploadAndDisplay.tsx` - OpenAPIベースのビデオAPIフックに置き換え
5. `app/page.tsx` - OpenAPIベースのAPI呼び出しに置き換え

#### 3.4 TRPCProviderの削除
**ファイル**: `frontend/src/providers/TRPCProvider.tsx`

**削除内容**:
- tRPCプロバイダーの削除
- `app/layout.tsx`からの参照削除
- React Queryのプロバイダーは維持（APIフックで使用）

#### 3.5 tRPC依存関係の削除
**削除対象**:
- `@trpc/client`
- `@trpc/next`
- `@trpc/react-query`
- `@trpc/server` (フロントエンドから)

### フェーズ4: テストと検証

#### 4.1 バックエンドテスト
- 各エンドポイントのユニットテスト
- 認証ミドルウェアのテスト
- バリデーションのテスト
- エラーハンドリングのテスト

#### 4.2 フロントエンドテスト
- APIフックのテスト
- コンポーネントの統合テスト
- エラーハンドリングのテスト

#### 4.3 E2Eテスト
- サインインフロー
- ユーザー情報更新フロー
- ビデオ作成・更新フロー

#### 4.4 OpenAPI仕様の検証
- Swagger UIでの動作確認
- スキーマの整合性確認
- ドキュメントの完全性確認

### フェーズ5: ドキュメントとクリーンアップ

#### 5.1 APIドキュメントの整備
- Swagger UIの設定
- エンドポイントの説明追加
- リクエスト/レスポンスの例追加

#### 5.2 コードのクリーンアップ
- 未使用コードの削除
- コメントの追加
- 型定義の整理

#### 5.3 READMEの更新
- 移行内容の記載
- API使用方法の更新
- 開発ガイドの更新

## 実装の詳細仕様

### DTO層の実装例

```typescript
// backend/src/dto/user.dto.ts
import { z } from 'zod';
import { createRoute } from 'zod-to-openapi';

export const userUpdateSchema = z.object({
  userName: z.string().optional(),
  profilePicture: z.object({
    fileName: z.string(),
    fileType: z.string(),
  }).optional(),
});

export const userDto = z.object({
  id: z.string(),
  userName: z.string(),
  email: z.string(),
  profilePicture: z.string().nullable(),
});

export const updateUserRoute = createRoute({
  method: 'put',
  path: '/api/user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: userUpdateSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'ユーザー情報更新成功',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            user: userDto,
            signedUrl: z.string().optional(),
            profilePictureUrl: z.string().optional(),
          }),
        },
      },
    },
  },
});
```

### 認証ミドルウェアの実装例

```typescript
// backend/src/middleware/auth.middleware.ts
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { JwtPayload } from '@/types/jwt';

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<JwtPayload> => {
  const token = request.cookies.token;
  if (!token) {
    reply.code(401).send({ error: '認証されていません' });
    throw new Error('Unauthorized');
  }

  try {
    const decoded = request.server.jwt.verify<JwtPayload>(token);
    return decoded;
  } catch (error) {
    reply.code(401).send({ error: '無効なトークンです' });
    throw new Error('Invalid token');
  }
};
```

### APIクライアントの実装例

```typescript
// frontend/src/utils/apiClient.ts
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // put, delete も同様に実装
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3001');
```

## リスクと対策

### リスク1: 移行中の機能停止
**対策**: 
- 段階的な移行（1つのルーターずつ）
- 並行稼働期間の設定
- ロールバック計画の準備

### リスク2: 型安全性の低下
**対策**:
- Zodスキーマによるバリデーション維持
- TypeScriptの型定義を活用
- 実行時バリデーションの実装

### リスク3: パフォーマンスの低下
**対策**:
- ベンチマークテストの実施
- キャッシュ戦略の最適化
- 必要に応じて最適化

## 移行スケジュール（目安）

- **フェーズ1**: 2-3日（基盤構築）
- **フェーズ2**: 5-7日（バックエンド実装）
- **フェーズ3**: 4-5日（フロントエンド実装）
- **フェーズ4**: 3-4日（テスト）
- **フェーズ5**: 1-2日（ドキュメント・クリーンアップ）

**合計**: 約15-21日

## チェックリスト

### バックエンド
- [ ] 依存関係の追加
- [ ] DTO層の構築
- [ ] OpenAPIルート定義の作成
- [ ] 認証ミドルウェアの実装
- [ ] FastifyへのOpenAPI統合
- [ ] Signin Routesの実装
- [ ] User Routesの実装
- [ ] Video Routesの実装
- [ ] エラーハンドリングの実装
- [ ] tRPC関連コードの削除
- [ ] テストの実装

### フロントエンド
- [ ] OpenAPIクライアントの実装
- [ ] APIフックの実装
- [ ] 既存コンポーネントの置き換え
- [ ] TRPCProviderの削除
- [ ] tRPC依存関係の削除
- [ ] テストの実装

### 共通
- [ ] APIドキュメントの整備
- [ ] コードのクリーンアップ
- [ ] READMEの更新
- [ ] E2Eテストの実施

