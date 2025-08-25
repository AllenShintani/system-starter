import { TRPCError } from "@trpc/server";
import { JwtPayload } from "../types/jwt";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

type Context = {
  fastify: CreateFastifyContextOptions["req"]["server"];
  request: CreateFastifyContextOptions["req"];
  reply: CreateFastifyContextOptions["res"];
};

export function verifyAuth(ctx: Context): JwtPayload {
  const token = ctx.request.cookies.token;
  if (!token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "認証されていません",
    });
  }
  try {
    const decoded = ctx.fastify.jwt.verify(token);
    return decoded as JwtPayload;
  } catch (error) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "無効なトークンです",
    });
  }
}
