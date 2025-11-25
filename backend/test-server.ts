/**
 * サーバーの起動テストスクリプト
 *
 * 実行方法: npx tsx test-server.ts
 *
 * 注意: 環境変数が必要です（.envファイルを用意してください）
 */

import { config } from "@/config/env.config";
import { prisma } from "@/prisma/client";
import { server } from "@/server";

const testServer = async (): Promise<void> => {
  try {
    console.log("🧪 サーバーテスト開始\n");

    // Prisma接続テスト
    console.log("📦 Prisma接続テスト...");
    await prisma.$connect();
    console.log("✅ Prisma接続成功\n");

    // サーバー起動テスト
    console.log("🚀 サーバー起動テスト...");
    await server.listen({ port: config.PORT });
    console.log(`✅ サーバー起動成功: http://localhost:${config.PORT}`);
    console.log(`📚 Swagger UI: http://localhost:${config.PORT}/api-docs`);
    console.log(`📋 OpenAPI JSON: http://localhost:${config.PORT}/api-docs/json\n`);

    // ルート確認
    console.log("📋 登録されたルート:");
    const routes = server.printRoutes();
    console.log(routes);

    console.log("\n✅ すべてのテストが成功しました");
    console.log("\n⚠️  サーバーを停止するには Ctrl+C を押してください");

    // シグナルハンドリング
    process.on("SIGINT", async () => {
      console.log("\n\n🛑 サーバーを停止しています...");
      await server.close();
      await prisma.$disconnect();
      console.log("✅ サーバーを停止しました");
      process.exit(0);
    });
  } catch (error) {
    console.error("\n❌ テストが失敗しました:");
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

testServer();
