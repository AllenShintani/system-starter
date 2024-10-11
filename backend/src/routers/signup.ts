import { initTRPC, TRPCError } from "@trpc/server";
import { userSchema } from "../schemas/userSchemas";
import { z } from "zod";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { adminInit, auth } from "../components/lib/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { prisma } from "../../prisma/client";
import * as admin from "firebase-admin";
import { JwtPayload } from "../types/jwt";

const createContext = ({ req, res }: CreateFastifyContextOptions) => ({
  fastify: req.server,
  request: req,
  reply: res,
});

const t = initTRPC.context<typeof createContext>().create();

export const signupRouter = t.router({
  signup: t.procedure
    .input(
      z.object({
        userData: userSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { userData } = input;
      const { email, password, firstName, lastName } = userData;
      const fullName =
        firstName && lastName ? `${lastName} ${firstName}` : undefined;

      try {
        adminInit();

        if (!email || !password) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Email and password are required",
          });
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const firebaseToken = await userCredential.user.getIdToken();
        const firebaseUid = (await admin.auth().verifyIdToken(firebaseToken))
          .uid;

        const prismaUser = await prisma.user.create({
          data: {
            email,
            firebaseUid: firebaseUid,
            firstName: firstName,
            lastName: lastName,
            fullName: fullName,
          },
        });
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
        if (
          error instanceof Error &&
          error.message.includes("auth/email-already-in-use")
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "このメールアドレスは既に使用されています",
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
      }
    }),
});
