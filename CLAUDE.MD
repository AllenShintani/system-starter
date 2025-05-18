# プロジェクトの説明

## 概要

私たちのプロダクトでは独自の構成を使用しています。しかし基本は関数型プログラミングの原則、型の安全性に考慮した TypeScript のベストプラクティスに従います。

## 基本方針

- 可読性と保守性を最優先とする
- 型安全性を確保する
- 一貫したコーディングスタイルを維持する

## TypeScript コーディングルール

- **let 変数は使用禁止**: 常に`const`を使用し、再代入が必要な処理は避ける。
- **any 型の使用禁止**: 適切な型定義を常に行う。
- **型アサーションの回避**: `as`による型アサーションは避け、型ガードと早期リターンを使用。
- **明示的な戻り値型**: すべての関数に戻り値の型アノテーションを付ける。
- **型エイリアスの優先**: インターフェイスよりも型エイリアスを優先して使用。
- **ドキュメント化**: すべての公開関数には TSDoc コメントを付与。
- **静的解析を通過**: すべてのコードは `npm run typecheck` と `npm run lint` を実行してエラーが出ないようにする。

## Coding Conventions

- 全てのカスタムコンポーネントのファイル名はパスカルケースで記述します。(e.g., `UserProfile.tsx`)
- Utility functions should be in `utils/` directory with camelCase names
- 状態管理を使用するカスタム hooks は`frontend/src/hooks`ディレクトリの下に配置します。

## tRPC 構成と型共有

- **バックエンドとフロントエンドの型共有**: フロントエンドで直接型を定義せず、`types`ディレクトリ配下でバックエンドから型をインポートして使用する。これにより型安全な密結合なコードを実現。
- **API フェッチ処理のカプセル化**: `trpc.hogeRouter.~`のような tRPC を使用した API フェッチ処理は、`hooks`ディレクトリ内の専用フックにまとめる。例えば：

```typescript
// 良い例: hooksにまとめる
export const useUserData = () => {
  return trpc.userRouter.getUser.useQuery();
};

// 悪い例: コンポーネント内で直接 trpc を呼び出す
const Component = () => {
  const userData = trpc.userRouter.getUser.useQuery(); // 避けるべき
};
```
