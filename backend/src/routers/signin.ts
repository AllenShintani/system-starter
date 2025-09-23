import { TRPCError } from "@trpc/server";

import { prisma } from "../../prisma/client";
import { config } from "../config/env.config";
import { getClerkUser } from "../lib/clerk";
import { t } from "../utils/createContext";
import {
  authStateSchema,
  jwtPayloadSchema,
  logoutResponseSchema,
  signinInputSchema,
  signinResponseSchema,
} from "../schemas";

import type { JwtPayload } from "../types/jwt";

const buildAuthUser = (user: {
  id: string;
  email: string;
  userName: string;
  profilePicture: string | null;
}) => ({
  id: user.id,
  email: user.email,
  name: user.userName,
  avatarUrl: user.profilePicture,
});

export const signinRouter = t.router({
  /**
   * Clerkで認証済みのユーザーがサインインする
   */
  signin: t.procedure.input(signinInputSchema).mutation(async ({ input, ctx }) => {
    const { clerkUserId } = input;

    try {
      const clerkUser = await getClerkUser(clerkUserId);
      if (!clerkUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Clerk user not found",
        });
      }

      const existingUser = await prisma.user.findUnique({
        where: { clerkUserId },
      });

      const user =
        existingUser ??
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

      const jwtPayload = jwtPayloadSchema.parse({
        userId: user.id,
        userName: user.userName,
        avatarUrl: user.profilePicture,
      });

      const token = ctx.fastify.jwt.sign(jwtPayload, {
        expiresIn: "7d",
        algorithm: "HS256",
      });

      ctx.reply.setCookie("token", token, {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return signinResponseSchema.parse({
        success: true,
        user: buildAuthUser(user),
        redirect: "/",
      });
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
    return logoutResponseSchema.parse({ success: true, redirect: "/signin" });
  }),

  /**
   * 認証状態の確認
   */
  checkAuth: t.procedure.query(async ({ ctx }) => {
    try {
      const token = ctx.request.cookies.token;
      if (!token) {
        return authStateSchema.parse({ authenticated: false, redirect: "/signin", user: null });
      }

      const decoded = ctx.fastify.jwt.verify<JwtPayload>(token);
      const payload = jwtPayloadSchema.parse(decoded);

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) {
        return authStateSchema.parse({ authenticated: false, redirect: "/signin", user: null });
      }

      return authStateSchema.parse({
        authenticated: true,
        user: buildAuthUser(user),
        redirect: null,
      });
    } catch (error) {
      console.error(error);
      return authStateSchema.parse({ authenticated: false, redirect: "/signin", user: null });
    }
  }),
});
