import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { prisma } from "../../prisma/client";
import { JwtPayload } from "../types/jwt";

const createContext = ({ req, res }: CreateFastifyContextOptions) => ({
  fastify: req.server,
  request: req,
  reply: res,
});

const t = initTRPC.context<typeof createContext>().create();

export const userRouter = t.router({
  getUser: t.procedure.query(async ({ ctx }) => {
    try {
      const token = ctx.request.cookies.token;
      if (!token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "認証されていません",
        });
      }
      const decoded = ctx.fastify.jwt.verify<JwtPayload>(token);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, firstName: true, lastName: true, email: true },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "ユーザーが見つかりません",
        });
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "ユーザー情報の取得に失敗しました",
      });
    }
  }),
});
