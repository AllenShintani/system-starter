## frontend ディレクトリ

frontend ディレクトリでは trpc の型共有, React, Next.js を使用した TypeScript の実装がされています。

### 方針

- Css は css module で記述しましょう。ディレクトリ構成は`src/app/hoge/page.tsx`の場合は `src/styles/app/hoge/Page.module.css`のようにパスに対応します。
- frontend で型を新しく定義するのはやめましょう。trpc の型推論を活用してください。
- 副作用は極力作らずメモ化をしましょう。状態を不用意に増やさずコードを綺麗に保ちましょう。
- useEffectは極力使用しない
- 異常系のコードを早期リターンし正常系のコードで if 文などを使用しないことにしましょう
- for文は極限まで使用せず map を使用するようにしてください
- function で定義せず、const で関数を定義するようにしましょう
- ルールに背いた実装を見つけた場合は修正しましょう
- lazy() と Suspenseを使用してページの読み込み速度を早くできる場合は積極的に使用する

### 型の方針

1. trpc で型を backend からインポート、または推論を使用しましょう

   - `backend/src/routers`に定義したもので型推論が付く場合は新しく backend から型をインポートしない
   - frontend で型を定義する場合は backend からインポートした型を活用する。もし変更が必要な場合は型の拡張、ジェネリクスを活用する。
   - interface ではなく type を使用する
   - any を使用しない
   - 型のアサーション, as などを簡単に使用しない。できるだけ使用しない

```tsx
// Good
import type { AppRouter } from "@your_service_name/backend/routers";
import type {
  CreateOsintQuestInput,
  UpdateOsintQuestInput,
} from "@your_service_name/backend/schemas";
import type { inferRouterOutputs } from "@trpc/server";

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type QuestList = RouterOutput["questRouter"]["getAllQuests"];
export type Quest = QuestList[number];
export type CreateQuestInput = CreateOsintQuestInput;

export type UpdateQuestInput = UpdateOsintQuestInput;

//Bad (interfaceを使用している。具体的な型を新たに定義している)
export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  thumbnail: string;
  description: string;
  content: string;
}
```

### import ルール

- 兄弟のファイルは相対パスで参照する
- 他のファイルはエイリアスを使用して参照する

```ts
// importの例
import UpdateQuest from "@/components/admin/quests/updateQuest";
```

### ディレクトリの構成

- `app/*/page.tsx`はページを表します。app/配下にpage.tsx以外のファイルを配置してはいけません。

### コメントアウトのルール

- コメントアウトでは単語や意味のないコメントは禁止
- 既存のコメントアウトを勝手に削除しない
- 変更を加えた場合に不要なコメントアウトを残さない
- 定数や関数で処理の名前がわかる場合、コメントアウトでは残さず処理が複雑な場合のみ残す
- 処理がぱっと見でわかりにくい場合はしっかりとコメントアウトを残す