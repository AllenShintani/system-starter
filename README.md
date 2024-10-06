## 技術スタック

・フレームワーク： Trpc


・フロントエンド： React, Next.js, 


・バックエンド: Fastify


DB, ORM： MySQL, Prisma


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

起動はfrontend, backendそれぞれのディレクトリで`npm run dev`


## PRを出す時
・ISSUEテンプレートを参考にしてください。


・手元でQA.mdのテスト項目を試してからPRを出してください
