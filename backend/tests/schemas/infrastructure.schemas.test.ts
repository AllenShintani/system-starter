import { describe, expect, it } from "vitest";

import { fileUploadRequestSchema, signedUploadSchema } from "../../src/schemas";

describe("infrastructure schemas", () => {
  it("fileUploadRequestSchema validates required fields", () => {
    const result = fileUploadRequestSchema.safeParse({
      fileName: "file.png",
      fileType: "image/png",
    });
    expect(result.success).toBe(true);
  });

  it("signedUploadSchema ensures URLs", () => {
    const result = signedUploadSchema.safeParse({
      url: "https://cdn.example.com/file.png",
      signedUrl: "https://upload.example.com",
    });
    expect(result.success).toBe(true);
  });
});
