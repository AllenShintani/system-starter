import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import Fastify from "fastify";

import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import type { FastifyInstance } from "fastify";

import { config } from "@/config/env.config";
import { prisma } from "@/prisma/client";
import { appRouter } from "@/routers";
import { registerRoutes } from "@/routes";

const server: FastifyInstance = Fastify();

// サーバーをエクスポート（テスト用）
export { server };

server.register(fastifyJwt, {
  secret: config.JWT_SECRET,
  sign: {
    algorithm: "HS256",
    expiresIn: "7d", // トークンの有効期限を設定
  },
  verify: {
    algorithms: ["HS256"], // 検証時にも使用するアルゴリズムを指定
  },
});

server.register(fastifyCookie);

// OpenAPI/Swagger設定
server.register(fastifySwagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "System Starter API",
      description: "System Starter API Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: "Development server",
      },
    ],
    tags: [
      { name: "signin", description: "認証関連" },
      { name: "user", description: "ユーザー関連" },
      { name: "video", description: "ビデオ関連" },
    ],
  },
});

server.register(fastifySwaggerUi, {
  routePrefix: "/api-docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

// OpenAPIルートを登録
registerRoutes(server);

// tRPCプラグインを登録（段階的移行のため、しばらくは残す）
server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    createContext: ({ req, res }: CreateFastifyContextOptions) => ({
      fastify: server,
      request: req,
      reply: res,
    }),
  },
});

server.register(cors, {
  origin: config.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});

// サーバーを起動
const start = async (): Promise<void> => {
  try {
    await prisma.$connect();
    await server.listen({ port: config.PORT });
    console.info(`🚀 Server listening on port: http://localhost:${config.PORT}`);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("EADDRINUSE")) {
        console.error(
          `Error: Port ${config.PORT} is already in use. Please choose a different port or close the application using this port.`
        );
      } else {
        console.error("Error starting server:", err.message);
      }
    } else {
      console.error("An unknown error occurred:", err);
    }
    await prisma.$disconnect();
    process.exit(1);
  }
};

start().catch(async (err) => {
  console.error("Error starting server:", err);
  await prisma.$disconnect();
  process.exit(1);
});
