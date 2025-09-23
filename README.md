## 技術スタック

・フレームワーク： Trpc

・フロントエンド： React, Next.js,

・バックエンド: Fastify

DB, ORM： MySQL, Prisma

## バックエンドアーキテクチャ

このプロジェクトは `senri-gps` と同様にスキーマ駆動の構成へ再設計されています。

```
backend/src/
├── generated/zod/      # Prisma から自動生成されるドメインスキーマ
├── schemas/
│   ├── domain/         # ドメインロジックで共有する型・スキーマ
│   ├── dto/            # ルーター ↔ usecase 間のデータ変換スキーマ
│   └── infrastructure/ # S3 等インフラ固有のスキーマ
├── features/
│   ├── user/
│   │   └── domain/     # ポート定義とユースケース
│   └── video/
│       └── domain/
└── routers/            # tRPC ルーター（スキーマとユースケースを利用）
```

- Prisma の Zod スキーマは `backend/src/generated/zod` に出力されます。
- ルーターは DTO スキーマで入出力を検証し、ユースケースへ処理を委譲します。
- インフラ境界（S3 署名付き URL など）は `schemas/infrastructure` に集約されています。

## 準備

下記のコマンドを打ち込んでください。

`git clone git@github.com:AllenShintani/Skalp_AI.git`

```
npm run setup

cp backend/.env.example backend/.env
cp frontend/.env.local.example .env.local
cp frontend/.env.production.example .env.production
```

backendに移動してセットアップを完了しましょう。

```

cd backend
docker-compose up -d

npx prisma generate
npx prisma migrate dev

npm run seed
```

`npx prisma generate` を実行すると Prisma Client に加え `src/generated/zod` のスキーマも更新されます。

起動はfrontend, backendそれぞれのディレクトリで`npm run dev`

## PRを出す時

・ISSUEテンプレートを参考にしてください。

・手元でQA.mdのテスト項目を試してからPRを出してください
