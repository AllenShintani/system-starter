import { TRPCError } from "@trpc/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as admin from "firebase-admin";
import { z } from "zod";

import { prisma } from "../../prisma/client";
import { adminInit, auth } from "../components/lib/firebase/firebase";
import { config } from "../config/env.config";
import { loginSchema } from "../schemas/userSchemas";
import { t } from "../utils/createContext";

import type { JwtPayload } from "../types/jwt";

export const loginRouter = t.router({
  login: t.procedure
    .input(z.object({ loginData: loginSchema }))
    .mutation(async ({ input, ctx }) => {
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
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseToken = await userCredential.user.getIdToken();
        const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
        const firebaseUid = decodedToken.uid;

        const searchedUser = await prisma.user.findUnique({
          where: { firebaseUid },
        });
        if (!searchedUser) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }
        const jwtPayload: JwtPayload = {
          userId: searchedUser.id,
          fullName: searchedUser.fullName,
          avatarUrl: searchedUser.profilePicture,
        };
        const token = ctx.fastify.jwt.sign(jwtPayload, {
          expiresIn: "7d",
          algorithm: "HS256",
        });
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
            id: searchedUser.id,
            email: searchedUser.email,
            name: searchedUser.fullName,
            avatarUrl: searchedUser.profilePicture,
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
  logout: t.procedure.mutation(async ({ ctx }) => {
    ctx.reply.clearCookie("token", { path: "/" });
    return { success: true, redirect: "/login" };
  }),

  checkAuth: t.procedure.query(async ({ ctx }) => {
    try {
      const token = ctx.request.cookies.token;
      if (!token) return { authenticated: false, redirect: "/login", user: null };

      const decoded = ctx.fastify.jwt.verify<JwtPayload>(token);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });
      if (!user) return { authenticated: false, redirect: "/login", user: null };

      return {
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.fullName,
          avatarUrl: user.profilePicture,
        },
        redirect: null,
      };
    } catch (error) {
      console.error(error);
      return { authenticated: false, redirect: "/login", user: null };
    }
  }),
});
