export type JwtPayload = {
  userId: string;
  role: string;
  userName: string | null;
  profilePicture: string | null;
  iat?: number;
  exp?: number;
};
