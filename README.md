## 技術スタック

・フレームワーク： Trpc


・フロントエンド： React, Next.js, 


・バックエンド: Fastify


DB, ORM： MySQL, Prisma


## 準備
下記のコマンドを打ち込んでください。


`git clone git@github.com:AllenShintani/Skalp_AI.git`



```
npm i
npm install --prefix frontend

cp frontend/.env.local.example frontend/.env.local
cp frontend/.env.production.example frontend/.env.production

npm run --prefix frontend dev
```

backendディレクトリでコマンドを打ってください。
```
cp backend/.env.example backend/.env
cp backend/.env.local.example backend/.env.local
cp backend/projectName-firebase-adminsdk.json.example backend/projectName-firebase-adminsdk.json

cd backend
docker-compose up -d

npx prisma generate
npx prisma migrate dev

npm run seed
npm run dev
```

起動はfrontend, backendそれぞれのディレクトリで`npm run dev`


## PRを出す時
・ISSUEテンプレートを参考にしてください。


・手元でQA.mdのテスト項目を試してからPRを出してください
