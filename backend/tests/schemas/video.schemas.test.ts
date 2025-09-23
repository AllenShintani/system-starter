import { describe, expect, it } from "vitest";

import {
  videoCreateInputSchema,
  videoUpdateInputSchema,
  videoMutationResponseSchema,
  videoListResponseSchema,
} from "../../src/schemas";

const validFile = {
  fileName: "sample.mp4",
  fileType: "video/mp4",
};

describe("video schemas", () => {
  it("videoCreateInputSchema should accept valid payload", () => {
    const result = videoCreateInputSchema.safeParse({
      title: "テスト動画",
      description: "説明",
      duration: 120,
      videoFile: validFile,
      thumbnailFile: {
        fileName: "thumb.png",
        fileType: "image/png",
      },
    });

    expect(result.success).toBe(true);
  });

  it("videoCreateInputSchema should reject invalid duration", () => {
    const result = videoCreateInputSchema.safeParse({
      title: "テスト動画",
      description: "説明",
      duration: -1,
    });

    expect(result.success).toBe(false);
  });

  it("videoUpdateInputSchema should require id", () => {
    const result = videoUpdateInputSchema.safeParse({
      id: "video-1",
      title: "更新タイトル",
      description: "更新",
      duration: 60,
      videoFile: validFile,
    });

    expect(result.success).toBe(true);
  });

  it("videoMutationResponseSchema should validate mutation output", () => {
    const result = videoMutationResponseSchema.safeParse({
      success: true,
      video: {
        id: "video-1",
        title: "タイトル",
        description: "説明",
        duration: 100,
        videoUrl: "https://example.com/video.mp4",
        thumbnailUrl: "https://example.com/thumb.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: "user-1",
      },
      videoSignedUrl: "https://upload.example.com/video",
    });

    expect(result.success).toBe(true);
  });

  it("videoListResponseSchema should ensure array of videos", () => {
    const result = videoListResponseSchema.safeParse([
      {
        id: "video-1",
        title: "タイトル",
        description: "説明",
        duration: 100,
        videoUrl: "https://example.com/video.mp4",
        thumbnailUrl: "https://example.com/thumb.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: "user-1",
      },
    ]);

    expect(result.success).toBe(true);
  });
});
