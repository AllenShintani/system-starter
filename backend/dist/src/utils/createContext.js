"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = void 0;
const server_1 = require("@trpc/server");
const createContext = ({ req, res }) => ({
    fastify: req.server,
    request: req,
    reply: res,
});
exports.t = server_1.initTRPC.context().create();
//# sourceMappingURL=createContext.js.map