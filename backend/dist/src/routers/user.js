"use strict";
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
exports.userRouter = void 0;
const server_1 = require("@trpc/server");
const client_1 = require("../../prisma/client");
const createContext = ({ req, res }) => ({
    fastify: req.server,
    request: req,
    reply: res,
});
const t = server_1.initTRPC.context().create();
exports.userRouter = t.router({
    getUser: t.procedure.query((_a) => __awaiter(void 0, [_a], void 0, function* ({ ctx }) {
        try {
            const token = ctx.request.cookies.token;
            if (!token) {
                throw new server_1.TRPCError({
                    code: "UNAUTHORIZED",
                    message: "認証されていません",
                });
            }
            const decoded = ctx.fastify.jwt.verify(token);
            const user = yield client_1.prisma.user.findUnique({
                where: { id: decoded.userId },
                select: { id: true, firstName: true, lastName: true, email: true },
            });
            if (!user) {
                throw new server_1.TRPCError({
                    code: "NOT_FOUND",
                    message: "ユーザーが見つかりません",
                });
            }
            return user;
        }
        catch (error) {
            console.error(error);
            throw new server_1.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "ユーザー情報の取得に失敗しました",
            });
        }
    })),
});
//# sourceMappingURL=user.js.map