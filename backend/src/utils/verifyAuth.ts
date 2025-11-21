import { TRPCError } from "@trpc/server";

import type { JwtPayload } from "@/types/jwt";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

type Context = {
  fastify: CreateFastifyContextOptions["req"]["server"];
  request: CreateFastifyContextOptions["req"];
  reply: CreateFastifyContextOptions["res"];
};

export const verifyAuth = (ctx: Context): JwtPayload => {
  const token = ctx.request.cookies.token;
  if (!token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "認証されていません",
    });
  }
  try {
    return ctx.fastify.jwt.verify<JwtPayload>(token);
  } catch (error) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "無効なトークンです",
    });
  }
};
