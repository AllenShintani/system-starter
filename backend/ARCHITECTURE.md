# OpenAPI アーキテクチャ設計方針

## ディレクトリ構造

```
backend/src/
  dto/                    # DTO層（Zodスキーマ + OpenAPI定義）
    index.ts              # DTOのエクスポート
    common/                # 共通DTO
      error.dto.ts        # エラーレスポンス
      file-upload.dto.ts  # ファイルアップロード
    signin/                # サインイン関連
      signin.dto.ts       # サインインDTO
    user/                  # ユーザー関連
      user.dto.ts         # ユーザーDTO
    video/                 # ビデオ関連
      video.dto.ts        # ビデオDTO
  routes/                  # ルート定義
    index.ts              # ルートの登録
    signin.routes.ts      # サインイン関連のルート
    user.routes.ts        # ユーザー関連のルート
    video.routes.ts       # ビデオ関連のルート
  middleware/              # ミドルウェア
    auth.middleware.ts    # 認証ミドルウェア
  utils/
    errorHandler.ts       # エラーハンドリング
    openapi-validator.ts  # OpenAPI検証ユーティリティ
  schemas/                # 既存のZodスキーマ（維持）
    (既存ファイル)
```

## 命名規則

### operationId
- **形式**: `{resource}{Action}`
- **例**: 
  - `signin` → `postSignin`
  - `getUser` → `getUser`
  - `updateUser` → `putUser`
  - `getAllVideos` → `getVideos`
  - `getVideo` → `getVideoById`
  - `createVideo` → `postVideo`
  - `updateVideo` → `putVideoById`

### スキーマ名（components/schemas）
- **形式**: `{Resource}{Type}`
- **例**:
  - `SigninRequest`, `SigninResponse`
  - `UserDto`, `UpdateUserRequest`, `UpdateUserResponse`
  - `VideoDto`, `CreateVideoRequest`, `UpdateVideoRequest`
  - `ErrorResponse`, `FileUploadDto`

### パス命名
- **形式**: `/api/{resource}` または `/api/{resource}/{id}`
- **例**:
  - `/api/signin`
  - `/api/logout`
  - `/api/auth/check`
  - `/api/user`
  - `/api/videos`
  - `/api/videos/:id`

## 設計原則

1. **スキーマの一元管理**: Zodスキーマを単一の情報源として使用
2. **型安全性**: TypeScriptの型定義を最大限活用
3. **再利用性**: 共通スキーマは`dto/common/`に配置
4. **一貫性**: 命名規則を厳守
5. **検証**: 静的解析ツールでoperationIdとスキーマ名の重複をチェック

## OpenAPI生成時の注意点

### openapi-typescriptとの互換性
- スキーマ名は明確で一意であること
- `$ref`の使用を最小限に（インライン定義を優先）
- 型生成に影響するため、nullableの扱いに注意

### zod-to-openapiの制約
- operationIdの重複は検出されない（静的解析でチェック）
- スキーマ名の重複は後から登録されたものが無視される（静的解析でチェック）

