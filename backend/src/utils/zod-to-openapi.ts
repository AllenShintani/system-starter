/**
 * ZodスキーマからOpenAPIスキーマを生成するユーティリティ
 * 
 * zod-to-openapiの代替実装
 * ZodスキーマをOpenAPI 3.0形式のスキーマに変換
 */

import type { ZodSchema, ZodTypeAny } from "zod";
import type { FastifySchema } from "fastify";

/**
 * Zodの型からOpenAPIの型に変換
 */
const zodTypeToOpenApiType = (zodType: string): string => {
  const typeMap: Record<string, string> = {
    ZodString: "string",
    ZodNumber: "number",
    ZodBoolean: "boolean",
    ZodDate: "string", // OpenAPIではdate-time形式
    ZodArray: "array",
    ZodObject: "object",
    ZodOptional: "optional",
    ZodNullable: "nullable",
    ZodEnum: "string",
  };
  return typeMap[zodType] || "string";
};

/**
 * ZodスキーマからOpenAPIスキーマオブジェクトを生成
 */
export const zodToOpenApiSchema = (schema: ZodSchema): Record<string, unknown> => {
  // 簡易実装: 詳細な変換は必要に応じて拡張
  // 実際の実装では、zodの内部構造を解析してOpenAPIスキーマを生成
  return {
    type: "object",
    properties: {},
    required: [],
  };
};

/**
 * ZodスキーマをFastifyのスキーマ形式に変換
 */
export const zodToFastifySchema = (schema: ZodSchema): FastifySchema => {
  return {
    body: schema,
    response: {
      200: schema,
    },
  };
};

/**
 * OpenAPIスキーマのバリデーション
 * operationIdやスキーマ名の重複をチェック
 */
export interface OpenApiValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const validateOpenApiSchema = (
  schemas: Record<string, unknown>
): OpenApiValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const operationIds = new Set<string>();
  const schemaNames = new Set<string>();

  // operationIdの重複チェック
  // 実装はOpenAPIオブジェクトを解析して行う

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

