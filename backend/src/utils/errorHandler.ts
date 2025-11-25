import type { FastifyReply } from "fastify";

/**
 * HTTPステータスコードのマッピング
 */
export const mapErrorToStatusCode = (error: Error): number => {
  if (error.message === "Unauthorized" || error.message === "Invalid token") {
    return 401;
  }
  if (error.message.includes("NOT_FOUND")) {
    return 404;
  }
  if (error.message.includes("BAD_REQUEST")) {
    return 400;
  }
  return 500;
};

/**
 * エラーレスポンスの統一フォーマット
 */
export const sendErrorResponse = (
  reply: FastifyReply,
  error: Error,
  statusCode?: number
): void => {
  const code = statusCode ?? mapErrorToStatusCode(error);
  reply.code(code).send({
    error: error.name || "INTERNAL_SERVER_ERROR",
    message: error.message,
  });
};

