import type { FastifyInstance } from "fastify";

import { registerSigninRoutes } from "./signin.routes";
import { registerUserRoutes } from "./user.routes";

/**
 * すべてのルートを登録
 */
export const registerRoutes = (server: FastifyInstance): void => {
  registerSigninRoutes(server);
  registerUserRoutes(server);
  // TODO: Video Routes を追加
};

