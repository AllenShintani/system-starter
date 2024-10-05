// backend/src/routers/login.ts
import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { loginSchema } from "../schemas/userSchemas";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { adminInit, auth } from "../components/lib/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as admin from "firebase-admin";
import { prisma } from "../../prisma/client";
import { JwtPayload } from "../types/jwt";

const createContext = ({ req, res }: CreateFastifyContextOptions) => ({
  fastify: req.server,
  request: req,
  reply: res,
});

const t = initTRPC.context<typeof createContext>().create();

export const loginRouter = t.router({
  login: t.procedure
    .input(z.object({ loginData: loginSchema }))
    .mutation(async ({ input, ctx }) => {
      if (!process.env.JWT_SECRET) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "JWT_SECRET is not set",
        });
      }

      const { loginData } = input;
      const { email, password } = loginData;

      try {
        adminInit();
        if (!email || !password) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Email and password are required",
          });
        }
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const firebaseToken = await userCredential.user.getIdToken();
        const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
        const firebaseUid = decodedToken.uid;

        const prismaUser = await prisma.user.findUnique({
          where: { firebaseUid },
        });
        if (!prismaUser) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }
        const jwtPayload: JwtPayload = { userId: prismaUser.id };
        const token = ctx.fastify.jwt.sign(jwtPayload, {
          expiresIn: "7d",
          algorithm: "HS256",
        });
        ctx.reply.setCookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return { success: true, userId: prismaUser.id, redirect: "/" };
      } catch (error) {
        console.error(error);
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
      }
    }),

  checkAuth: t.procedure.query(async ({ ctx }) => {
    try {
      const token = ctx.request.cookies.token;
      if (!token) {
        return { authenticated: false, redirect: "/login" };
      }
      const decoded = ctx.fastify.jwt.verify<JwtPayload>(token);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });
      if (!user) {
        return { authenticated: false, redirect: "/login" };
      }
      return { authenticated: true, userId: user.id, redirect: null };
    } catch (error) {
      console.error(error);
      return { authenticated: false, redirect: "/login" };
    }
  }),

  logout: t.procedure.mutation(async ({ ctx }) => {
    ctx.reply.clearCookie("token", { path: "/" });
    return { success: true, redirect: "/login" };
  }),
});
