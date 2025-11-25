import type { FastifyInstance } from "fastify";

import { registerSigninRoutes } from "./signin.routes";

/**
 * すべてのルートを登録
 */
export const registerRoutes = (server: FastifyInstance): void => {
  registerSigninRoutes(server);
  // TODO: User Routes, Video Routes を追加
};

