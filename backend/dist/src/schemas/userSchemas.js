"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateSchema =
  exports.loginSchema =
  exports.createUserSchema =
  exports.userSchema =
    void 0;
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
exports.userUpdateSchema = zod_1.z.object({
  firstName: zod_1.z.string().optional(),
  lastName: zod_1.z.string().optional(),
  profilePicture: zod_1.z
    .object({
      fileName: zod_1.z.string(),
      fileType: zod_1.z.string(),
    })
    .optional(),
});
//# sourceMappingURL=userSchemas.js.map
