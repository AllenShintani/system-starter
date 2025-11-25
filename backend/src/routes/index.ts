import type { FastifyInstance } from "fastify";

import { registerSigninRoutes } from "./signin.routes";
import { registerUserRoutes } from "./user.routes";
import { registerVideoRoutes } from "./video.routes";

/**
 * すべてのルートを登録
 */
export const registerRoutes = (server: FastifyInstance): void => {
  registerSigninRoutes(server);
  registerUserRoutes(server);
  registerVideoRoutes(server);
};

