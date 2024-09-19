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
exports.loginRouter = void 0;
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const userSchemas_1 = require("../schemas/userSchemas");
const firebase_1 = require("../components/lib/firebase/firebase");
const auth_1 = require("firebase/auth");
const admin = __importStar(require("firebase-admin"));
const client_1 = require("../../prisma/client");
const createContext = ({ req, res }) => ({
    fastify: req.server,
    request: req,
    reply: res,
});
const t = server_1.initTRPC.context().create();
exports.loginRouter = t.router({
    login: t.procedure
        .input(zod_1.z.object({
        loginData: userSchemas_1.loginSchema,
    }))
        .mutation((_a) => __awaiter(void 0, [_a], void 0, function* ({ input, ctx }) {
        const { loginData } = input;
        const { email, password } = loginData;
        try {
            (0, firebase_1.adminInit)();
            if (!email || !password) {
                throw new Error('Email and password are required');
            }
            const userCredential = yield (0, auth_1.signInWithEmailAndPassword)(firebase_1.auth, email, password);
            const firebaseToken = yield userCredential.user.getIdToken();
            const firebaseUid = (yield admin.auth().verifyIdToken(firebaseToken))
                .uid;
            const prismaUser = yield client_1.prisma.user.findUnique({
                where: { firebaseUid },
            });
            if (!prismaUser) {
                throw new Error('User not found');
            }
            const token = ctx.fastify.jwt.sign({ userId: prismaUser.id });
            ctx.reply.setCookie('token', token, {
                httpOnly: false,
                secure: false,
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });
            const userUuid = prismaUser.id;
            return userUuid;
        }
        catch (error) {
            console.error(error);
        }
    })),
});
//# sourceMappingURL=login.js.map