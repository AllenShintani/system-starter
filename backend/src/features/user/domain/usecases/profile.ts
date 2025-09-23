import { userPublicSchema } from "../../../../schemas/domain/user";
import type { UserPublic } from "../../../../schemas/domain/user";
import type { UserUpdateData, UserPorts } from "../ports/user";

export const getUserProfile = async (
  ports: UserPorts,
  userId: string
): Promise<UserPublic | null> => {
  const user = await ports.findById(userId);
  if (!user) return null;
  return userPublicSchema.parse(user);
};

export const updateUserProfile = async (
  ports: UserPorts,
  userId: string,
  data: UserUpdateData
): Promise<UserPublic> => {
  const updated = await ports.update(userId, data);
  return userPublicSchema.parse(updated);
};
