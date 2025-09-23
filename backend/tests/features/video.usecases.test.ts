import { describe, expect, it, vi } from "vitest";

import {
  createVideo,
  getVideoById,
  listVideos,
  updateVideo,
} from "../../src/features/video/domain/usecases/video";

import type { VideoPorts, VideoStoragePorts } from "../../src/features/video/domain/ports/video";

const sampleVideo = {
  id: "video-1",
  title: "タイトル",
  description: "説明",
  duration: 100,
  videoUrl: "https://cdn.example.com/video.mp4",
  thumbnailUrl: "https://cdn.example.com/thumb.png",
  createdAt: new Date(),
  updatedAt: new Date(),
  authorId: "user-1",
};

describe("video usecases", () => {
  const createPorts = (): VideoPorts => ({
    list: vi.fn().mockResolvedValue([sampleVideo]),
    findById: vi.fn().mockResolvedValue(sampleVideo),
    create: vi.fn().mockResolvedValue({ ...sampleVideo, videoUrl: "", thumbnailUrl: "" }),
    update: vi.fn().mockImplementation(async (_id, data) => ({ ...sampleVideo, ...data })),
  });

  const createStorage = (withUploads = true): VideoStoragePorts => ({
    createUpload: withUploads
      ? vi.fn().mockImplementation(async (_file, _id, target) => ({
          url: `https://cdn.example.com/${target}.mp4`,
          signedUrl: `https://upload.example.com/${target}`,
        }))
      : vi.fn(),
  });

  it("listVideos returns stored videos", async () => {
    const ports = createPorts();
    const result = await listVideos(ports);

    expect(result).toHaveLength(1);
    expect(ports.list).toHaveBeenCalledTimes(1);
  });

  it("getVideoById returns matching video", async () => {
    const ports = createPorts();
    const result = await getVideoById(ports, "video-1");

    expect(result?.id).toBe("video-1");
    expect(ports.findById).toHaveBeenCalledWith("video-1");
  });

  it("createVideo creates video and schedules uploads", async () => {
    const ports = createPorts();
    const storage = createStorage();

    const result = await createVideo(ports, storage, "user-1", {
      title: "タイトル",
      description: "説明",
      duration: 120,
      videoFile: { fileName: "video.mp4", fileType: "video/mp4" },
      thumbnailFile: { fileName: "thumb.png", fileType: "image/png" },
    });

    expect(ports.create).toHaveBeenCalledTimes(1);
    expect(storage.createUpload).toHaveBeenCalledTimes(2);
    expect(result.video.videoUrl).toBe("https://cdn.example.com/video.mp4");
    expect(result.videoUpload?.signedUrl).toContain("video");
  });

  it("updateVideo updates fields without uploads", async () => {
    const ports = createPorts();
    const storage = createStorage(false);

    const result = await updateVideo(ports, storage, "user-1", {
      id: "video-1",
      title: "更新タイトル",
      description: "更新説明",
      duration: 80,
    });

    expect(ports.update).toHaveBeenCalledWith("video-1", {
      title: "更新タイトル",
      description: "更新説明",
      duration: 80,
      authorId: "user-1",
    });
    expect(result.video.title).toBe("更新タイトル");
    expect(result.videoUpload).toBeUndefined();
  });
});
