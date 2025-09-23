import { describe, expect, it } from "vitest";

import {
  authStateSchema,
  jwtPayloadSchema,
  signinInputSchema,
  signinResponseSchema,
  logoutResponseSchema,
  userUpdateInputSchema,
  userUpdateResponseSchema,
  userPublicSchema,
} from "../../src/schemas";

describe("auth and user schemas", () => {
  it("jwtPayloadSchema accepts valid payload", () => {
    const result = jwtPayloadSchema.safeParse({
      userId: "user-1",
      userName: "tester",
      avatarUrl: null,
    });
    expect(result.success).toBe(true);
  });

  it("signinInputSchema rejects missing clerkUserId", () => {
    const result = signinInputSchema.safeParse({ clerkUserId: "" });
    expect(result.success).toBe(false);
  });

  it("signinResponseSchema requires redirect", () => {
    const result = signinResponseSchema.safeParse({
      success: true,
      user: {
        id: "user-1",
        email: "user@example.com",
        name: "tester",
        avatarUrl: null,
      },
      redirect: "/",
    });
    expect(result.success).toBe(true);
  });

  it("logoutResponseSchema ensures success literal", () => {
    const result = logoutResponseSchema.safeParse({ success: true, redirect: "/signin" });
    expect(result.success).toBe(true);
  });

  it("authStateSchema handles unauthenticated state", () => {
    const result = authStateSchema.safeParse({
      authenticated: false,
      user: null,
      redirect: "/signin",
    });
    expect(result.success).toBe(true);
  });

  it("userUpdateInputSchema allows optional fields", () => {
    const result = userUpdateInputSchema.safeParse({
      userName: "new-name",
      profilePicture: {
        fileName: "icon.png",
        fileType: "image/png",
      },
    });
    expect(result.success).toBe(true);
  });

  it("userUpdateResponseSchema validates response payload", () => {
    const result = userUpdateResponseSchema.safeParse({
      success: true,
      user: {
        id: "user-1",
        userName: "tester",
        email: "user@example.com",
        profilePicture: null,
      },
      signedUrl: "https://upload.example.com/avatar",
      profilePictureUrl: "https://cdn.example.com/avatar.png",
    });
    expect(result.success).toBe(true);
  });

  it("userPublicSchema fails without email", () => {
    const result = userPublicSchema.safeParse({
      id: "user-1",
      userName: "tester",
      email: "user@example.com",
      profilePicture: null,
    });
    expect(result.success).toBe(true);
  });
});
