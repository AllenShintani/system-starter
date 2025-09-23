import { describe, expect, it, vi } from "vitest";

vi.mock("@aws-sdk/client-s3", () => ({
  PutObjectCommand: vi.fn().mockImplementation((input) => input),
}));

vi.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: vi.fn().mockResolvedValue("https://upload.example.com"),
}));

vi.mock("../../src/utils/s3Client", () => ({
  default: {},
}));

import { generateFileUpload } from "../../src/utils/s3/generateFileUpload";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const mockedGetSignedUrl = vi.mocked(getSignedUrl);

describe("generateFileUpload", () => {
  beforeEach(() => {
    mockedGetSignedUrl.mockReset();
    mockedGetSignedUrl.mockResolvedValue("https://upload.example.com");
  });

  it("creates signed url payload", async () => {
    const result = await generateFileUpload(
      { fileName: "video.mp4", fileType: "video/mp4" },
      "video-1",
      "video"
    );

    expect(PutObjectCommand).toHaveBeenCalledWith({
      Bucket: "hackers-guild-bucket",
      Key: "lessons/video-1/video/video.mp4",
      ContentType: "video/mp4",
    });
    expect(getSignedUrl).toHaveBeenCalled();
    expect(result).toEqual({
      url: "https://hackers-guild-bucket.s3.ap-northeast-1.amazonaws.com/lessons/video-1/video/video.mp4",
      signedUrl: "https://upload.example.com",
    });
  });
});
