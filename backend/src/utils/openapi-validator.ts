/**
 * OpenAPIスキーマの静的検証ツール
 * 
 * operationIdやスキーマ名の重複をチェック
 * zod-to-openapiの課題を補完する
 */

import type { OpenAPIV3 } from "openapi-types";

export interface ValidationError {
  type: "duplicate" | "missing" | "invalid";
  message: string;
  path?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

/**
 * OpenAPIドキュメントの検証
 */
export const validateOpenApiDocument = (
  document: OpenAPIV3.Document
): ValidationResult => {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  const operationIds = new Map<string, string[]>();
  const schemaNames = new Set<string>();

  // operationIdの重複チェック
  if (document.paths) {
    for (const [path, pathItem] of Object.entries(document.paths)) {
      if (!pathItem) continue;

      const methods = ["get", "post", "put", "delete", "patch", "options", "head"] as const;
      for (const method of methods) {
        const operation = pathItem[method];
        if (!operation) continue;

        if (operation.operationId) {
          const existing = operationIds.get(operation.operationId);
          if (existing) {
            existing.push(`${method.toUpperCase()} ${path}`);
            errors.push({
              type: "duplicate",
              message: `Duplicate operationId: "${operation.operationId}"`,
              path: `${method.toUpperCase()} ${path}`,
            });
          } else {
            operationIds.set(operation.operationId, [`${method.toUpperCase()} ${path}`]);
          }
        } else {
          warnings.push({
            type: "missing",
            message: `Missing operationId for ${method.toUpperCase()} ${path}`,
            path: `${method.toUpperCase()} ${path}`,
          });
        }
      }
    }
  }

  // スキーマ名の重複チェック
  if (document.components?.schemas) {
    for (const [schemaName, schema] of Object.entries(document.components.schemas)) {
      if (schemaNames.has(schemaName)) {
        errors.push({
          type: "duplicate",
          message: `Duplicate schema name: "${schemaName}"`,
          path: `components/schemas/${schemaName}`,
        });
      } else {
        schemaNames.add(schemaName);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * CLI用の検証関数
 */
export const validateOpenApiFile = async (filePath: string): Promise<ValidationResult> => {
  try {
    const fs = await import("fs/promises");
    const yaml = await import("js-yaml");
    const content = await fs.readFile(filePath, "utf-8");
    const document = yaml.load(content) as OpenAPIV3.Document;
    return validateOpenApiDocument(document);
  } catch (error) {
    return {
      isValid: false,
      errors: [
        {
          type: "invalid",
          message: `Failed to parse OpenAPI file: ${error instanceof Error ? error.message : String(error)}`,
          path: filePath,
        },
      ],
      warnings: [],
    };
  }
};

