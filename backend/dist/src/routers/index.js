"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const server_1 = require("@trpc/server");
const signup_1 = require("./signup");
const login_1 = require("./login");
const user_1 = require("./user");
const t = server_1.initTRPC.create();
exports.appRouter = t.mergeRouters(signup_1.signupRouter, login_1.loginRouter, user_1.userRouter);
//# sourceMappingURL=index.js.map