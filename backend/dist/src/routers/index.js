"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const server_1 = require("@trpc/server");
const signup_1 = require("./signup");
const login_1 = require("./login");
const user_1 = require("./user");
const t = server_1.initTRPC.create();
exports.appRouter = t.router({
    signupRouter: signup_1.signupRouter,
    loginRouter: login_1.loginRouter,
    userRouter: user_1.userRouter,
});
//# sourceMappingURL=index.js.map