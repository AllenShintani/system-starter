"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRouter = void 0;
const server_1 = require("@trpc/server");
const userSchemas_1 = require("../schemas/userSchemas");
const zod_1 = require("zod");
const server_2 = require("@trpc/server");
const firebase_1 = require("../components/lib/firebase/firebase");
const auth_1 = require("firebase/auth");
const client_1 = require("../../prisma/client");
const admin = __importStar(require("firebase-admin"));
const createContext = ({ req, res }) => ({
    fastify: req.server,
    request: req,
    reply: res,
});
const t = server_1.initTRPC.context().create();
exports.signupRouter = t.router({
    signup: t.procedure
        .input(zod_1.z.object({
        userData: userSchemas_1.userSchema,
    }))
        .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ input, ctx }) {
        const { userData } = input;
        const { email, password, firstName, lastName } = userData;
        const fullName = firstName && lastName ? `${lastName} ${firstName}` : undefined;
        try {
            (0, firebase_1.adminInit)();
            if (!email || !password) {
                throw new Error('Email and password are required');
            }
            const userCredential = yield (0, auth_1.createUserWithEmailAndPassword)(firebase_1.auth, email, password);
            const firebaseToken = yield userCredential.user.getIdToken();
            const firebaseUid = (yield admin.auth().verifyIdToken(firebaseToken))
                .uid;
            const prismaUser = yield client_1.prisma.user.create({
                data: {
                    email,
                    firebaseUid: firebaseUid,
                    firstName: firstName,
                    lastName: lastName,
                    fullName: fullName,
                },
            });
            const token = ctx.fastify.jwt.sign({ userId: prismaUser.id });
            ctx.reply.setCookie('token', token, {
                httpOnly: false /*console.logでフロントエンドに表示したりするためにfalseにしている*/,
                secure: false /*process.env.NODE_ENV !== 'production'*/, //本番環境ではtrueにしなきゃいけない！要確認！！
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 7日間有効
            });
            const userUuid = prismaUser.id;
            return { userUuid };
        }
        catch (error) {
            console.error(error);
            throw new server_2.TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'An unexpected error occurred, please try again later.',
            });
        }
    })),
});
//# sourceMappingURL=signup.js.map