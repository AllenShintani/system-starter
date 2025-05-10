## backend ディレクトリ

backend ディレクトリの中には trpc, fastify, zod を使用した TypeScript の実装がされています。

### 方針

- Zod による型のバリデーションを必ず行う
- ユーザーの role はディレクトリ構成で視覚的にわかりやすく分ける。role ごとにプロシージャを定義する
- 依存性は prisma => schema => router => frontend での利用と繋がるように一方通行にします。このルールから外れる場合は私に必ず確認してください。
- let を使用せず const で書いてください。

### Schema の方針

1. 具体的な型を使用

   - `/backend/src/schemas` の下に定義する
   - schema 定義もディレクトリごとに role が判別できるようにする
   - res, req を利用することで frontend で入力される型と返す型がわかりやすいようにする
   - any の使用を避ける
   - Utility Types を活用する
   - 極力型のアサーションは使用しない

2. 型エイリアスの命名

   - 意味のある名前をつける
   - 型の意図を明確にする
   - 型の名前は長くなったとしても具体的な名前にしましょう。
   -

   ```ts
   // Good
   export const updateOsintQuestSchema = {
     req: baseOsintQuestSchema.partial().extend({
       id: z.string().uuid("有効なIDを入力してください"),
     }),
     res: questResponseSchema,
   };

   // Bad(req, resが定義されていない)
   export const createCourseSchema = z.object({
     title: z.string().min(1),
     description: z.string().min(1),
     thumbnailUrl: z.string().url(),
     courseType: z.string(),
     sections: z.array(
       z.object({
         sectionId: z.string(),
         order: z.number().int().min(0),
       })
     ),
   });
   ```

### テストのルール

- vitest を使用する
- カバレッジは 100%にする。カバレッジの計測は`npm run test:coverage`で計測する
- とくに実装上の理由がない限り、 describe による入れ子はしない
- as anyなどで無理やり型を解決しようとしない
- テストコードは行数が長くなっても構いません。400行を超えることがあっても良い。
- テストは全て通過し、カバレッジが100%になることを目指す。

```ts
// 例
expect(result, "<expected behavior>").toBe("result");
// で可能な限り期待する動作を書く
```

### テストファイルのディレクトリ構成

ディレクトリ構成は__tests__をsrcと考えた時に対応するファイルのテストになる。たとえば`backend/src/routers/admin/coupon.ts`のテストの場合は`backend/src/__tests__/routers/admin/coupon.test.ts`になる。