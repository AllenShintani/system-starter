import { describe, expect, it, vi } from "vitest";

import { verifyAuth } from "../../src/utils/verifyAuth";

const createContext = (token: string | undefined, decoded?: unknown) => {
  const verify = vi.fn();
  if (typeof token !== "undefined" && decoded) {
    verify.mockReturnValue(decoded);
  } else if (typeof token !== "undefined") {
    verify.mockImplementation(() => {
      throw new Error("invalid token");
    });
  }

  return {
    fastify: { jwt: { verify } },
    request: { cookies: { token } },
    reply: {},
  } as never;
};

describe("verifyAuth", () => {
  it("throws when token missing", () => {
    expect(() => verifyAuth(createContext(undefined))).toThrow(/認証されていません/);
  });

  it("returns payload when valid", () => {
    const payload = { userId: "user-1", userName: "tester", avatarUrl: null };
    const result = verifyAuth(createContext("token", payload));

    expect(result).toEqual(payload);
  });

  it("throws when token invalid", () => {
    expect(() => verifyAuth(createContext("token"))).toThrow(/無効なトークンです/);
  });
});
