import { vi } from "vitest";

export const videoMock = {
  findMany: vi.fn(),
  findUnique: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
};

export const userMock = {
  findUnique: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
};

export const prisma = {
  video: videoMock,
  user: userMock,
};
