import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../src/utils/verifyAuth", () => ({
  verifyAuth: vi.fn(),
}));

vi.mock("../../prisma/client", () => import("../mocks/prisma"));
vi.mock("@aws-sdk/client-s3", () => ({
  PutObjectCommand: vi.fn().mockImplementation((input) => input),
}));

vi.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: vi.fn().mockResolvedValue("https://upload.example.com"),
}));

vi.mock("../../src/utils/s3Client", () => ({
  default: {},
}));

import { userRouter } from "../../src/routers/user";
import { verifyAuth } from "../../src/utils/verifyAuth";
import { userMock } from "../mocks/prisma";

const createContext = () => ({
  fastify: { jwt: { verify: vi.fn() } },
  request: { cookies: { token: "token" } },
  reply: {},
});

describe("userRouter", () => {
  beforeEach(() => {
    vi.mocked(verifyAuth).mockReturnValue({
      userId: "user-1",
      userName: "tester",
      avatarUrl: null,
    });
    userMock.findUnique.mockReset();
    userMock.update.mockReset();
    userMock.findUnique.mockResolvedValue({
      id: "user-1",
      email: "user@example.com",
      userName: "tester",
      profilePicture: null,
    });
    userMock.update.mockResolvedValue({
      id: "user-1",
      email: "user@example.com",
      userName: "tester",
      profilePicture:
        "https://hackers-guild-bucket.s3.ap-northeast-1.amazonaws.com/profile-pictures/user-1/icon.png",
    });
  });

  it("returns current user", async () => {
    const caller = userRouter.createCaller(createContext());
    const user = await caller.getUser();

    expect(user?.email).toBe("user@example.com");
    expect(userMock.findUnique).toHaveBeenCalledWith({ where: { id: "user-1" } });
  });

  it("handles errors when user fetch fails", async () => {
    userMock.findUnique.mockRejectedValueOnce(new Error("db"));
    const caller = userRouter.createCaller(createContext());

    await expect(caller.getUser()).rejects.toThrow(/取得に失敗しました/);
  });

  it("throws not found when user is missing", async () => {
    userMock.findUnique.mockResolvedValueOnce(null);
    const caller = userRouter.createCaller(createContext());

    await expect(caller.getUser()).rejects.toThrow(/取得に失敗しました/);
  });

  it("updates user profile with picture", async () => {
    const caller = userRouter.createCaller(createContext());
    const result = await caller.update({
      userName: "new",
      profilePicture: { fileName: "icon.png", fileType: "image/png" },
    });

    expect(userMock.update).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: {
        userName: "new",
        profilePicture:
          "https://hackers-guild-bucket.s3.ap-northeast-1.amazonaws.com/profile-pictures/user-1/icon.png",
      },
    });
    expect(result.profilePictureUrl).toBe(
      "https://hackers-guild-bucket.s3.ap-northeast-1.amazonaws.com/profile-pictures/user-1/icon.png"
    );
  });

  it("updates user profile without picture", async () => {
    const caller = userRouter.createCaller(createContext());
    const result = await caller.update({ userName: "no-picture" });

    expect(userMock.update).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: {
        userName: "no-picture",
      },
    });
    expect(result.signedUrl).toBeUndefined();
    expect(result.profilePictureUrl).toBeUndefined();
  });

  it("handles errors during update", async () => {
    userMock.update.mockRejectedValueOnce(new Error("db"));
    const caller = userRouter.createCaller(createContext());

    await expect(
      caller.update({
        userName: "new",
        profilePicture: { fileName: "icon.png", fileType: "image/png" },
      })
    ).rejects.toThrow(/更新に失敗しました/);
  });
});
