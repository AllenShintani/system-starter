export type JwtPayload = {
  userId: string;
  userName: string;
  avatarUrl: string | null;
  iat?: number;
  exp?: number;
};
