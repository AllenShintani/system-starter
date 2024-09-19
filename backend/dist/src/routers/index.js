"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const server_1 = require("@trpc/server");
const signup_1 = require("./signup");
const login_1 = require("./login");
const t = server_1.initTRPC.create();
exports.appRouter = t.mergeRouters(signup_1.signupRouter, login_1.loginRouter);
//# sourceMappingURL=index.js.map