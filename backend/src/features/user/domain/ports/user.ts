import type { UserBase } from "../../../../schemas/domain/user";

export type UserUpdateData = {
  userName?: string;
  profilePicture?: string;
};

export type UserPorts = {
  findById: (id: string) => Promise<UserBase | null>;
  update: (id: string, data: UserUpdateData) => Promise<UserBase>;
};
