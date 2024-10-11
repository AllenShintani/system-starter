import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import type { FastifyInstance } from "fastify";
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { appRouter } from "./routers";
import { prisma } from "../prisma/client";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

const server: FastifyInstance = Fastify();

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not set in environment variables");
  process.exit(1);
}

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
  sign: {
    algorithm: "HS256",
    expiresIn: "7d", // トークンの有効期限を設定
  },
  verify: {
    algorithms: ["HS256"], // 検証時にも使用するアルゴリズムを指定
  },
});

server.register(fastifyCookie);

// tRPCプラグインを登録
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
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});

// サーバーを起動
const start = async () => {
  try {
    await prisma.$connect();
    await server.listen({ port: 8080 });
    console.log(`Server listening on port: http://localhost:8080`);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("EADDRINUSE")) {
        console.error(
          "Error: Port 8080 is already in use. Please choose a different port or close the application using this port."
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
