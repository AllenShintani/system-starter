import { describe, expect, it, vi } from "vitest";

import { getUserProfile, updateUserProfile } from "../../src/features/user/domain/usecases/profile";

import type { UserPorts } from "../../src/features/user/domain/ports/user";

const user = {
  id: "user-1",
  userName: "tester",
  email: "user@example.com",
  profilePicture: null,
};

describe("user profile usecases", () => {
  const createPorts = (exists = true): UserPorts => ({
    findById: vi.fn().mockResolvedValue(exists ? user : null),
    update: vi.fn().mockImplementation(async (_id, data) => ({ ...user, ...data })),
  });

  it("getUserProfile returns null when user not found", async () => {
    const ports = createPorts(false);
    const result = await getUserProfile(ports, "user-unknown");

    expect(result).toBeNull();
    expect(ports.findById).toHaveBeenCalledWith("user-unknown");
  });

  it("getUserProfile returns sanitized user", async () => {
    const ports = createPorts();
    const result = await getUserProfile(ports, "user-1");

    expect(result?.email).toBe("user@example.com");
  });

  it("updateUserProfile delegates to ports", async () => {
    const ports = createPorts();
    const result = await updateUserProfile(ports, "user-1", { userName: "new" });

    expect(ports.update).toHaveBeenCalledWith("user-1", { userName: "new" });
    expect(result.userName).toBe("new");
  });
});
