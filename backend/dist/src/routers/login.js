"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const userSchemas_1 = require("../schemas/userSchemas");
const firebase_1 = require("../components/lib/firebase/firebase");
const auth_1 = require("firebase/auth");
const admin = __importStar(require("firebase-admin"));
const client_1 = require("../../prisma/client");
const createContext_1 = require("../utils/createContext");
exports.loginRouter = createContext_1.t.router({
  login: createContext_1.t.procedure
    .input(zod_1.z.object({ loginData: userSchemas_1.loginSchema }))
    .mutation((_a) =>
      __awaiter(void 0, [_a], void 0, function* ({ input, ctx }) {
        const { loginData } = input;
        const { email, password } = loginData;
        try {
          (0, firebase_1.adminInit)();
          if (!email || !password) {
            throw new server_1.TRPCError({
              code: "BAD_REQUEST",
              message: "Email and password are required",
            });
          }
          const userCredential = yield (0, auth_1.signInWithEmailAndPassword)(
            firebase_1.auth,
            email,
            password
          );
          const firebaseToken = yield userCredential.user.getIdToken();
          const decodedToken = yield admin.auth().verifyIdToken(firebaseToken);
          const firebaseUid = decodedToken.uid;
          const searchedUser = yield client_1.prisma.user.findUnique({
            where: { firebaseUid },
          });
          if (!searchedUser) {
            throw new server_1.TRPCError({
              code: "NOT_FOUND",
              message: "User not found",
            });
          }
          const jwtPayload = {
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
            secure: process.env.NODE_ENV === "production",
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
          if (error instanceof server_1.TRPCError) throw error;
          throw new server_1.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred",
          });
        }
      })
    ),
  logout: createContext_1.t.procedure.mutation((_a) =>
    __awaiter(void 0, [_a], void 0, function* ({ ctx }) {
      ctx.reply.clearCookie("token", { path: "/" });
      return { success: true, redirect: "/login" };
    })
  ),
  checkAuth: createContext_1.t.procedure.query((_a) =>
    __awaiter(void 0, [_a], void 0, function* ({ ctx }) {
      try {
        const token = ctx.request.cookies.token;
        if (!token)
          return { authenticated: false, redirect: "/login", user: null };
        const decoded = ctx.fastify.jwt.verify(token);
        const user = yield client_1.prisma.user.findUnique({
          where: { id: decoded.userId },
        });
        if (!user)
          return { authenticated: false, redirect: "/login", user: null };
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
    })
  ),
});
//# sourceMappingURL=login.js.map
