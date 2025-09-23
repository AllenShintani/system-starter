import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../src/utils/verifyAuth", () => ({
  verifyAuth: vi.fn(),
}));

vi.mock("../../src/utils/s3/generateFileUpload", () => ({
  generateFileUpload: vi.fn(),
}));

vi.mock("../../prisma/client", () => import("../mocks/prisma"));

import { videoRouter } from "../../src/routers/video";
import { verifyAuth } from "../../src/utils/verifyAuth";
import { generateFileUpload } from "../../src/utils/s3/generateFileUpload";
import { videoMock } from "../mocks/prisma";

const createContext = () => ({
  fastify: { jwt: { verify: vi.fn() } },
  request: { cookies: { token: "token" } },
  reply: {},
});

describe("videoRouter", () => {
  beforeEach(() => {
    vi.mocked(verifyAuth).mockReturnValue({
      userId: "user-1",
      userName: "tester",
      avatarUrl: null,
    });
    vi.mocked(generateFileUpload).mockImplementation(async (_file, id, target) => ({
      url: `https://cdn.example.com/${id}/${target}`,
      signedUrl: `https://upload.example.com/${target}`,
    }));
    videoMock.findMany.mockResolvedValue([
      {
        id: "video-1",
        title: "title",
        description: "desc",
        duration: 100,
        videoUrl: "https://cdn.example.com/video.mp4",
        thumbnailUrl: "https://cdn.example.com/thumb.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: "user-1",
      },
    ]);
    videoMock.findUnique.mockResolvedValue({
      id: "video-1",
      title: "title",
      description: "desc",
      duration: 100,
      videoUrl: "https://cdn.example.com/video.mp4",
      thumbnailUrl: "https://cdn.example.com/thumb.png",
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: "user-1",
    });
    videoMock.create.mockResolvedValue({
      id: "video-1",
      title: "title",
      description: "desc",
      duration: 100,
      videoUrl: "",
      thumbnailUrl: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: "user-1",
    });
    videoMock.update.mockResolvedValue({
      id: "video-1",
      title: "title",
      description: "desc",
      duration: 100,
      videoUrl: "https://cdn.example.com/video-1/video",
      thumbnailUrl: "https://cdn.example.com/video-1/thumbnail",
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: "user-1",
    });
  });

  it("returns all videos", async () => {
    const caller = videoRouter.createCaller(createContext());
    const result = await caller.getAllVideoes();

    expect(result).toHaveLength(1);
    expect(videoMock.findMany).toHaveBeenCalled();
  });

  it("handles errors when listing videos", async () => {
    videoMock.findMany.mockRejectedValueOnce(new Error("db"));
    const caller = videoRouter.createCaller(createContext());

    await expect(caller.getAllVideoes()).rejects.toThrow(/ビデオ一覧/);
  });

  it("returns single video", async () => {
    const caller = videoRouter.createCaller(createContext());
    const result = await caller.getVideo("video-1");

    expect(result?.id).toBe("video-1");
    expect(videoMock.findUnique).toHaveBeenCalledWith({ where: { id: "video-1" } });
  });

  it("handles errors when fetching single video", async () => {
    videoMock.findUnique.mockRejectedValueOnce(new Error("db"));
    const caller = videoRouter.createCaller(createContext());

    await expect(caller.getVideo("video-err")).rejects.toThrow(/取得に失敗しました/);
  });

  it("returns null when video absent", async () => {
    videoMock.findUnique.mockResolvedValueOnce(null);
    const caller = videoRouter.createCaller(createContext());

    const result = await caller.getVideo("video-missing");
    expect(result).toBeNull();
  });

  it("creates video and returns signed urls", async () => {
    const caller = videoRouter.createCaller(createContext());
    const result = await caller.postVideo({
      title: "title",
      description: "desc",
      duration: 100,
      videoFile: { fileName: "video.mp4", fileType: "video/mp4" },
      thumbnailFile: { fileName: "thumb.png", fileType: "image/png" },
    });

    expect(videoMock.create).toHaveBeenCalled();
    expect(videoMock.update).toHaveBeenCalled();
    expect(result.videoSignedUrl).toContain("video");
    expect(result.thumbnailSignedUrl).toContain("thumbnail");
  });

  it("creates video without uploads", async () => {
    const caller = videoRouter.createCaller(createContext());
    const result = await caller.postVideo({
      title: "title",
      description: "desc",
      duration: 120,
    });

    expect(videoMock.create).toHaveBeenCalled();
    expect(result.videoSignedUrl).toBeUndefined();
    expect(result.thumbnailSignedUrl).toBeUndefined();
  });

  it("handles errors when creating video", async () => {
    videoMock.create.mockRejectedValueOnce(new Error("db"));
    const caller = videoRouter.createCaller(createContext());

    await expect(
      caller.postVideo({
        title: "title",
        description: "desc",
        duration: 100,
      })
    ).rejects.toThrow(/作成に失敗しました/);
  });

  it("updates video metadata", async () => {
    const caller = videoRouter.createCaller(createContext());
    const result = await caller.putVideo({
      id: "video-1",
      title: "new",
      description: "new-desc",
      duration: 90,
    });

    expect(videoMock.update).toHaveBeenCalledWith({
      where: { id: "video-1" },
      data: {
        title: "new",
        description: "new-desc",
        duration: 90,
        authorId: "user-1",
      },
    });
    expect(result.video.title).toBe("title");
    expect(result.videoSignedUrl).toBeUndefined();
    expect(result.thumbnailSignedUrl).toBeUndefined();
  });

  it("updates video with uploads", async () => {
    const caller = videoRouter.createCaller(createContext());
    const result = await caller.putVideo({
      id: "video-1",
      title: "with-files",
      description: "desc",
      duration: 60,
      videoFile: { fileName: "video.mp4", fileType: "video/mp4" },
      thumbnailFile: { fileName: "thumb.png", fileType: "image/png" },
    });

    expect(result.videoSignedUrl).toContain("video");
    expect(result.thumbnailSignedUrl).toContain("thumbnail");
  });

  it("handles errors on update", async () => {
    videoMock.update.mockRejectedValueOnce(new Error("db"));
    const caller = videoRouter.createCaller(createContext());

    await expect(
      caller.putVideo({ id: "video-1", title: "new", description: "desc", duration: 100 })
    ).rejects.toThrow(/更新/);
  });
});
