// backend/vitest.setup.cts
const { afterAll, afterEach, beforeAll } = require('vitest')

beforeAll(async () => {
  // テスト全体の前に1回実行
  // データベースの接続やマイグレーションなど
})

afterEach(async () => {
  // 各テストの後に実行
  // テストデータのクリーンアップなど
})

afterAll(async () => {
  // テスト全体の後に1回実行
  // データベース接続のクローズなど
})
