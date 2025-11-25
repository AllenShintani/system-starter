import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import type { JwtPayload } from "@/types/jwt";

import { config } from "@/config/env.config";
import {
  signinRequestSchema,
  signinResponseSchema,
  logoutResponseSchema,
  checkAuthResponseSchema,
  type SigninRequestDto,
} from "@/dto/signin";
import { getClerkUser } from "@/lib/clerk";
import { prisma } from "@/prisma/client";
import { sendErrorResponse } from "@/utils/errorHandler";

/**
 * サインインルート
 * POST /api/signin
 */
const signinHandler = async (
  request: FastifyRequest<{ Body: SigninRequestDto }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { clerkUserId } = request.body;

    // Clerkからユーザー情報を取得
    const clerkUser = await getClerkUser(clerkUserId);
    if (!clerkUser) {
      reply.code(404).send({
        error: "NOT_FOUND",
        message: "Clerk user not found",
      });
      return;
    }

    // データベースからユーザーを検索
    const existingUser = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    // ユーザーが存在しない場合は作成
    const email = clerkUser.emailAddresses?.[0]?.emailAddress;
    if (!email) {
      reply.code(400).send({
        error: "BAD_REQUEST",
        message: "No email address found in Clerk user",
      });
      return;
    }

    const user =
      existingUser ??
      (await prisma.user.create({
        data: {
          clerkUserId,
          email,
          userName: clerkUser.username || clerkUser.firstName || email.split("@")[0],
          profilePicture: clerkUser.imageUrl,
        },
      }));

    // JWTトークンを発行
    const jwtPayload: JwtPayload = {
      userId: user.id,
      userName: user.userName,
      avatarUrl: user.profilePicture,
    };

    const token = request.server.jwt.sign(jwtPayload, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    // Cookieにトークンを設定
    reply.setCookie("token", token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    const response = signinResponseSchema.parse({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.userName,
        avatarUrl: user.profilePicture,
      },
      redirect: "/",
    });

    reply.code(200).send(response);
  } catch (error) {
    console.error(error);
    sendErrorResponse(reply, error instanceof Error ? error : new Error("An unexpected error occurred"));
  }
};

/**
 * ログアウトルート
 * POST /api/logout
 */
const logoutHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    reply.clearCookie("token", { path: "/" });

    const response = logoutResponseSchema.parse({
      success: true,
      redirect: "/signin",
    });

    reply.code(200).send(response);
  } catch (error) {
    console.error(error);
    sendErrorResponse(reply, error instanceof Error ? error : new Error("An unexpected error occurred"));
  }
};

/**
 * 認証状態確認ルート
 * GET /api/auth/check
 */
const checkAuthHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const token = request.cookies.token;
    if (!token) {
      const response = checkAuthResponseSchema.parse({
        authenticated: false,
        redirect: "/signin",
        user: null,
      });
      reply.code(200).send(response);
      return;
    }

    const decoded = request.server.jwt.verify<JwtPayload>(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      const response = checkAuthResponseSchema.parse({
        authenticated: false,
        redirect: "/signin",
        user: null,
      });
      reply.code(200).send(response);
      return;
    }

    const response = checkAuthResponseSchema.parse({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.userName || "",
        avatarUrl: user.profilePicture,
      },
      redirect: null,
    });

    reply.code(200).send(response);
  } catch (error) {
    console.error(error);
    const response = checkAuthResponseSchema.parse({
      authenticated: false,
      redirect: "/signin",
      user: null,
    });
    reply.code(200).send(response);
  }
};

/**
 * Signinルートを登録
 */
export const registerSigninRoutes = (server: FastifyInstance): void => {
  // POST /api/signin
  server.post(
    "/api/signin",
    {
      schema: {
        description: "Clerkで認証済みのユーザーがサインインする",
        tags: ["signin"],
        body: signinRequestSchema,
        response: {
          200: signinResponseSchema,
          400: {
            type: "object",
            properties: {
              error: { type: "string" },
              message: { type: "string" },
            },
          },
          404: {
            type: "object",
            properties: {
              error: { type: "string" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    signinHandler
  );

  // POST /api/logout
  server.post(
    "/api/logout",
    {
      schema: {
        description: "ログアウト処理",
        tags: ["signin"],
        response: {
          200: logoutResponseSchema,
        },
      },
    },
    logoutHandler
  );

  // GET /api/auth/check
  server.get(
    "/api/auth/check",
    {
      schema: {
        description: "認証状態の確認",
        tags: ["signin"],
        response: {
          200: checkAuthResponseSchema,
        },
      },
    },
    checkAuthHandler
  );
};

