## TypeScript

TypeScript を利用した私のプロジェクトでのコーディングにおける一般的なベストプラクティスをまとめます。

### 方針

- 循環的複雑度と認知的複雑度を下げる工夫を常に行いましょう。認知的複雑度 > 循環的複雑度の順で優先されます
- 最初に型と、それを処理する関数のインターフェースを考える
- 早期リターンを活用する
- コードのコメントとして、そのファイルがどういう仕様かを可能な限り明記する
- どうしても class を使用する場合がある場合は私に確認する
- frontend ディレクトリの中で api を利用する時、新たに型を定義しない
- Next.js の api は使用しないでください。backend ディレクトリ内で trpc を利用して定義したものを使用します。
- 副作用を抽象するために、アダプタパターンで外部依存を抽象し、テストではインメモリなアダプタで処理する
- .envファイルなどgitignoreされているファイルに変更を加える場合は私に確認する
- 日付が未来の可能性があったりする場合はコマンドで現在の日付を調べる。APIのバージョンなどで未来の日付のように思っても私に確認する
- setTimeoutは使用しないでください
- Boy Scout Ruleに則って使用されていないコードやルールに反するコードを見つけた場合は報告と修正をしてください。すぐに修正できない場合は報告のみ行い、修正はしないでください。例えばどのページでも使用されていないコンポーネントや使用されていないcssなどは削除の対象です。
- コマンドを実行する場合はカレントディレクトリを必ず確認してからcdを使用するのか判断しましょう。
- エラーを修正したり、機能を追加した場合に`npx tsc --noEmit`を実行してfrontend, backendそれぞれにエラーがないか確認しましょう。

### 型の使用方針

1. 具体的な型を使用

   - any の使用を避ける
   - unknown を使用してから型を絞り込む
   - Utility Types を活用する
   - 極力型のアサーションは使用しない

2. 型エイリアスの命名

   - 意味のある名前をつける
   - 型の意図を明確にする
   - 型の名前は長くなったとしても具体的な名前にしましょう。

   ```ts
   // Good
   type UserId = string;
   type UserData = {
     id: UserId;
     createdAt: Date;
   };

   // Bad
   type Data = any;
   ```

### エラー処理

1. Result 型の使用

   ```ts
   import { Result, ok, err } from "npm:neverthrow";

   type ApiError =
     | { type: "network"; message: string }
     | { type: "notFound"; message: string }
     | { type: "unauthorized"; message: string };

   async function fetchUser(id: string): Promise<Result<User, ApiError>> {
     try {
       const response = await fetch(`/api/users/${id}`);
       if (!response.ok) {
         switch (response.status) {
           case 404:
             return err({ type: "notFound", message: "User not found" });
           case 401:
             return err({ type: "unauthorized", message: "Unauthorized" });
           default:
             return err({
               type: "network",
               message: `HTTP error: ${response.status}`,
             });
         }
       }
       return ok(await response.json());
     } catch (error) {
       return err({
         type: "network",
         message: error instanceof Error ? error.message : "Unknown error",
       });
     }
   }
   ```

2. エラー型の定義
   - 具体的なケースを列挙
   - エラーメッセージを含める
   - 型の網羅性チェックを活用

### 実装パターン

1. 関数ベース

   ```ts
   // インターフェース
   interface Logger {
     log(message: string): void;
   }

   // 実装
   function createLogger(): Logger {
     return {
       log(message: string): void {
         console.log(`[${new Date().toISOString()}] ${message}`);
       },
     };
   }
   ```

### 実装の選択基準

- 関数型プログラミングの原則に従う
- linter, formatter を無効にしない
- 副作用を限りなく減らす
- 認知的複雑度を下げる
- 依存が少ない
- テストが容易

### 一般的なルール

1. 依存性の注入

   - 外部依存はコンストラクタで注入
   - テスト時にモックに置き換え可能に
   - グローバルな状態を避ける

2. インターフェースの設計

   - interface で型を定義するのではなく type で型を定義する
   - 必要最小限のメソッドを定義
   - 実装の詳細を含めない
   - プラットフォーム固有の型を避ける

3. テスト容易性

   - モックの実装を簡潔に
   - エッジケースのテストを含める
   - テストヘルパーを適切に分離

4. コードの分割
   - 単一責任の原則に従う
   - 適切な粒度でモジュール化
   - 循環参照を避ける
