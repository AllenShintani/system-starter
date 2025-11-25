import type { FastifyRequest, FastifyReply } from "fastify";
import type { JwtPayload } from "@/types/jwt";

/**
 * 認証ミドルウェア
 * JWTトークンを検証し、認証情報をリクエストに追加
 */
export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<JwtPayload> => {
  const token = request.cookies.token;
  if (!token) {
    reply.code(401).send({
      error: "UNAUTHORIZED",
      message: "認証されていません",
    });
    throw new Error("Unauthorized");
  }

  try {
    const decoded = request.server.jwt.verify<JwtPayload>(token);
    return decoded;
  } catch (error) {
    reply.code(401).send({
      error: "UNAUTHORIZED",
      message: "無効なトークンです",
    });
    throw new Error("Invalid token");
  }
};

