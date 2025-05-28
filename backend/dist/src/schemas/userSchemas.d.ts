import { z } from "zod";
export declare const userSchema: z.ZodObject<
  {
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    fullName: z.ZodOptional<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    email: string;
    password: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
    fullName?: string | undefined;
  },
  {
    email: string;
    password: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
    fullName?: string | undefined;
  }
>;
export declare const createUserSchema: z.ZodObject<
  {
    token: z.ZodString;
    userData: z.ZodObject<
      {
        email: z.ZodString;
        password: z.ZodString;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
      },
      "strip",
      z.ZodTypeAny,
      {
        email: string;
        password: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
      },
      {
        email: string;
        password: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
      }
    >;
  },
  "strip",
  z.ZodTypeAny,
  {
    token: string;
    userData: {
      email: string;
      password: string;
      firstName?: string | undefined;
      lastName?: string | undefined;
    };
  },
  {
    token: string;
    userData: {
      email: string;
      password: string;
      firstName?: string | undefined;
      lastName?: string | undefined;
    };
  }
>;
export declare const loginSchema: z.ZodObject<
  {
    email: z.ZodString;
    password: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    email: string;
    password: string;
  },
  {
    email: string;
    password: string;
  }
>;
export declare const userUpdateSchema: z.ZodObject<
  {
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    profilePicture: z.ZodOptional<
      z.ZodObject<
        {
          fileName: z.ZodString;
          fileType: z.ZodString;
        },
        "strip",
        z.ZodTypeAny,
        {
          fileName: string;
          fileType: string;
        },
        {
          fileName: string;
          fileType: string;
        }
      >
    >;
  },
  "strip",
  z.ZodTypeAny,
  {
    firstName?: string | undefined;
    lastName?: string | undefined;
    profilePicture?:
      | {
          fileName: string;
          fileType: string;
        }
      | undefined;
  },
  {
    firstName?: string | undefined;
    lastName?: string | undefined;
    profilePicture?:
      | {
          fileName: string;
          fileType: string;
        }
      | undefined;
  }
>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type User = z.infer<typeof userSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
//# sourceMappingURL=userSchemas.d.ts.map
