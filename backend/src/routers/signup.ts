import { TRPCError } from "@trpc/server";
import { userSchema } from "../schemas/userSchemas";
import { z } from "zod";
import { adminInit, auth } from "../components/lib/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { prisma } from "../../prisma/client";
import * as admin from "firebase-admin";
import { JwtPayload } from "../types/jwt";
import { t } from "../utils/createContext";
import { config } from "../config/env.config";

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

        const createUser = await prisma.user.create({
          data: {
            email,
            firebaseUid: firebaseUid,
            firstName: firstName,
            lastName: lastName,
            fullName: fullName,
          },
        });

        const jwtPayload: JwtPayload = {
          userId: createUser.id,
          fullName: createUser.fullName,
          avatarUrl: createUser.profilePicture,
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
            id: createUser.id,
            email: createUser.email,
            name: createUser.fullName,
            avatarUrl: createUser.profilePicture,
          },
          redirect: "/",
        };
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
});
