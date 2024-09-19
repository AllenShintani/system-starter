"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.createUserSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    fullName: zod_1.z.string().optional(),
});
exports.createUserSchema = zod_1.z.object({
    token: zod_1.z.string(),
    userData: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
    }),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
//# sourceMappingURL=userSchemas.js.map