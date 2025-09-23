import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../prisma/client", () => import("../mocks/prisma"));
vi.mock("../../src/lib/clerk", () => ({
  getClerkUser: vi.fn(),
}));

import { signinRouter } from "../../src/routers/signin";
import { userMock } from "../mocks/prisma";
import { getClerkUser } from "../../src/lib/clerk";

const silentError = vi.spyOn(console, "error").mockImplementation(() => {});

const createContext = (token?: string) => {
  const reply = {
    setCookie: vi.fn(),
    clearCookie: vi.fn(),
  };
  const fastify = {
    jwt: {
      sign: vi.fn().mockReturnValue("signed-token"),
      verify: vi.fn().mockReturnValue({ userId: "user-1", userName: "tester", avatarUrl: null }),
    },
  };
  const request = {
    cookies: { token },
  };
  return { fastify, reply, request } as never;
};

describe("signinRouter", () => {
  beforeEach(() => {
    userMock.findUnique.mockReset();
    userMock.create.mockReset();
    vi.mocked(getClerkUser).mockResolvedValue({
      id: "clerk_1",
      emailAddresses: [{ emailAddress: "user@example.com" }],
      username: "tester",
      firstName: "Test",
      imageUrl: "https://cdn.example.com/avatar.png",
    } as never);
    userMock.findUnique.mockResolvedValue({
      id: "user-1",
      email: "user@example.com",
      userName: "tester",
      profilePicture: null,
      clerkUserId: "clerk_1",
    });
    userMock.create.mockResolvedValue({
      id: "user-1",
      email: "user@example.com",
      userName: "tester",
      profilePicture: null,
      clerkUserId: "clerk_1",
    });
  });

  afterAll(() => {
    silentError.mockRestore();
  });

  it("signs in existing user", async () => {
    const ctx = createContext();
    const caller = signinRouter.createCaller(ctx);
    const result = await caller.signin({ clerkUserId: "clerk_1" });

    expect(result.success).toBe(true);
    expect(userMock.findUnique).toHaveBeenCalled();
    expect(ctx.reply.setCookie).toHaveBeenCalledWith(
      "token",
      "signed-token",
      expect.objectContaining({
        httpOnly: true,
      })
    );
    expect(userMock.create).not.toHaveBeenCalled();
  });

  it("creates user when not found", async () => {
    userMock.findUnique.mockResolvedValueOnce(null);
    const ctx = createContext();
    const caller = signinRouter.createCaller(ctx);
    await caller.signin({ clerkUserId: "clerk_1" });

    expect(userMock.create).toHaveBeenCalled();
  });

  it("uses Clerk first name when username missing", async () => {
    userMock.findUnique.mockResolvedValueOnce(null);
    userMock.create.mockImplementationOnce(async (args: any) => ({
      id: "user-1",
      email: args.data.email,
      userName: args.data.userName,
      profilePicture: args.data.profilePicture,
      clerkUserId: args.data.clerkUserId,
    }));
    vi.mocked(getClerkUser).mockResolvedValueOnce({
      id: "clerk_1",
      emailAddresses: [{ emailAddress: "user@example.com" }],
      username: null,
      firstName: "Tester",
      imageUrl: "https://cdn.example.com/avatar.png",
    } as never);
    const ctx = createContext();
    const caller = signinRouter.createCaller(ctx);
    const result = await caller.signin({ clerkUserId: "clerk_1" });

    expect(result.user.name).toBe("Tester");
  });

  it("falls back to email local-part when name fields absent", async () => {
    userMock.findUnique.mockResolvedValueOnce(null);
    userMock.create.mockImplementationOnce(async (args: any) => ({
      id: "user-1",
      email: args.data.email,
      userName: args.data.userName,
      profilePicture: args.data.profilePicture,
      clerkUserId: args.data.clerkUserId,
    }));
    vi.mocked(getClerkUser).mockResolvedValueOnce({
      id: "clerk_1",
      emailAddresses: [{ emailAddress: "user@example.com" }],
      username: null,
      firstName: null,
      imageUrl: "https://cdn.example.com/avatar.png",
    } as never);
    const ctx = createContext();
    const caller = signinRouter.createCaller(ctx);
    const result = await caller.signin({ clerkUserId: "clerk_1" });

    expect(result.user.name).toBe("user");
  });

  it("throws when clerk user missing", async () => {
    vi.mocked(getClerkUser).mockResolvedValueOnce(null);
    const ctx = createContext();
    const caller = signinRouter.createCaller(ctx);

    await expect(caller.signin({ clerkUserId: "missing" })).rejects.toThrow(/Clerk user not found/);
  });

  it("throws when clerk user lacks email", async () => {
    vi.mocked(getClerkUser).mockResolvedValueOnce({
      id: "clerk_1",
      emailAddresses: [],
      username: "tester",
      firstName: "Test",
      imageUrl: "https://cdn.example.com/avatar.png",
    } as never);
    userMock.findUnique.mockResolvedValueOnce(null);
    const ctx = createContext();
    const caller = signinRouter.createCaller(ctx);

    await expect(caller.signin({ clerkUserId: "clerk_1" })).rejects.toThrow(/No email address/);
  });

  it("handles unexpected errors", async () => {
    userMock.findUnique.mockRejectedValueOnce(new Error("db"));
    const ctx = createContext();
    const caller = signinRouter.createCaller(ctx);

    await expect(caller.signin({ clerkUserId: "clerk_1" })).rejects.toThrow(/unexpected/);
  });

  it("logs out user", async () => {
    const ctx = createContext();
    const caller = signinRouter.createCaller(ctx);
    const result = await caller.logout();

    expect(result.redirect).toBe("/signin");
    expect(ctx.reply.clearCookie).toHaveBeenCalledWith("token", { path: "/" });
  });

  it("returns auth state when authenticated", async () => {
    const ctx = createContext("signed-token");
    const caller = signinRouter.createCaller(ctx);

    const result = await caller.checkAuth();
    expect(result.authenticated).toBe(true);
  });

  it("returns unauthenticated when token missing", async () => {
    const ctx = createContext();
    ctx.request.cookies.token = undefined as never;
    const caller = signinRouter.createCaller(ctx);

    const result = await caller.checkAuth();
    expect(result.authenticated).toBe(false);
    expect(result.redirect).toBe("/signin");
  });

  it("returns unauthenticated when verification fails", async () => {
    const ctx = createContext("token");
    ctx.fastify.jwt.verify.mockImplementationOnce(() => {
      throw new Error("invalid");
    });
    const caller = signinRouter.createCaller(ctx);

    const result = await caller.checkAuth();
    expect(result.authenticated).toBe(false);
  });

  it("returns unauthenticated when user not found", async () => {
    const ctx = createContext("token");
    userMock.findUnique.mockResolvedValueOnce(null);
    const caller = signinRouter.createCaller(ctx);

    const result = await caller.checkAuth();
    expect(result.authenticated).toBe(false);
  });
});
