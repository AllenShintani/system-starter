import { zodToJsonSchema } from "zod-to-json-schema";
import type { z } from "zod";

/**
 * ZodスキーマをFastify用のJSON Schemaに変換
 */
export const zodToFastifySchema = <T extends z.ZodTypeAny>(schema: T) => {
  return zodToJsonSchema(schema, {
    target: "openApi3",
    $refStrategy: "none",
  });
};

