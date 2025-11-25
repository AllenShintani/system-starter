import { zodToJsonSchema } from "zod-to-json-schema";
import type { z } from "zod";

/**
 * ZodスキーマをFastify用のJSON Schemaに変換
 */
export const zodToFastifySchema = <T extends z.ZodTypeAny>(schema: T) => {
  const jsonSchema = zodToJsonSchema(schema, {
    target: "openApi3",
    $refStrategy: "none",
    strictUnions: false,
    dateStrategy: "format:date-time",
  }) as Record<string, unknown>;

  // exclusiveMinimumがbooleanの場合、数値に変換
  const fixExclusiveMinimum = (obj: unknown): unknown => {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(fixExclusiveMinimum);
    }

    const fixed: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key === "exclusiveMinimum" && typeof value === "boolean") {
        fixed[key] = value ? 0 : undefined;
      } else {
        fixed[key] = fixExclusiveMinimum(value);
      }
    }
    return fixed;
  };

  return fixExclusiveMinimum(jsonSchema) as Record<string, unknown>;
};

