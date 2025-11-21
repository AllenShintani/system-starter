import { TRPCError } from "@trpc/server";
import { z } from "zod";

import type { JwtPayload } from "@/types/jwt";

import { config } from "@/config/env.config";
import { getClerkUser } from "@/lib/clerk";
import { prisma } from "@/prisma/client";
import { t } from "@/utils/createContext";

export const signinRouter = t.router({
  /**
   * Clerkで認証済みのユーザーがサインインする
   */
  signin: t.procedure
    .input(z.object({ clerkUserId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { clerkUserId } = input;

      try {
        // Clerkからユーザー情報を取得
        const clerkUser = await getClerkUser(clerkUserId);
        if (!clerkUser) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Clerk user not found",
          });
        }

        // データベースからユーザーを検索
        const existingUser = await prisma.user.findUnique({
          where: { clerkUserId },
        });

        // ユーザーが存在しない場合は作成
        const user =
          existingUser ??
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          (await (async () => {
            const email = clerkUser.emailAddresses?.[0]?.emailAddress;
            if (!email) {
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "No email address found in Clerk user",
              });
            }

            return prisma.user.create({
              data: {
                clerkUserId,
                email,
                userName: clerkUser.username || clerkUser.firstName || email.split("@")[0],
                profilePicture: clerkUser.imageUrl,
              },
            });
          })());

        // JWTトークンを発行
        const jwtPayload: JwtPayload = {
          userId: user.id,
          userName: user.userName,
          avatarUrl: user.profilePicture,
        };

        const token = ctx.fastify.jwt.sign(jwtPayload, {
          expiresIn: "7d",
          algorithm: "HS256",
        });

        // Cookieにトークンを設定
        ctx.reply.setCookie("token", token, {
          httpOnly: true,
          secure: config.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return {
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.userName,
            avatarUrl: user.profilePicture,
          },
          redirect: "/",
        };
      } catch (error) {
        console.error(error);
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
      }
    }),

  /**
   * ログアウト処理
   */
  logout: t.procedure.mutation(async ({ ctx }) => {
    ctx.reply.clearCookie("token", { path: "/" });
    return { success: true, redirect: "/signin" };
  }),

  /**
   * 認証状態の確認
   */
  checkAuth: t.procedure.query(async ({ ctx }) => {
    try {
      const token = ctx.request.cookies.token;
      if (!token) {
        return { authenticated: false, redirect: "/signin", user: null };
      }

      const decoded = ctx.fastify.jwt.verify<JwtPayload>(token);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        return { authenticated: false, redirect: "/signin", user: null };
      }

      return {
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.userName || "",
          avatarUrl: user.profilePicture,
        },
        redirect: null,
      };
    } catch (error) {
      console.error(error);
      return { authenticated: false, redirect: "/signin", user: null };
    }
  }),
});
