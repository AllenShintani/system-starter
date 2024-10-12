"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuth = verifyAuth;
const server_1 = require("@trpc/server");
function verifyAuth(ctx) {
    const token = ctx.request.cookies.token;
    if (!token) {
        throw new server_1.TRPCError({
            code: "UNAUTHORIZED",
            message: "認証されていません",
        });
    }
    try {
        const decoded = ctx.fastify.jwt.verify(token);
        return decoded;
    }
    catch (error) {
        throw new server_1.TRPCError({
            code: "UNAUTHORIZED",
            message: "無効なトークンです",
        });
    }
}
//# sourceMappingURL=verifyAuth.js.map