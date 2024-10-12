export type JwtPayload = {
  userId: string;
  fullName: string | null;
  avatarUrl: string | null;
  iat?: number;
  exp?: number;
};
