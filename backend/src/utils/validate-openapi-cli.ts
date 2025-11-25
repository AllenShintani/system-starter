#!/usr/bin/env tsx
/**
 * OpenAPIスキーマ検証CLI
 * 
 * 使用方法:
 * npm run validate:openapi [openapi-file-path]
 */

import { validateOpenApiFile } from "./openapi-validator";

const main = async (): Promise<void> => {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error("Usage: npm run validate:openapi <openapi-file-path>");
    process.exit(1);
  }

  const result = await validateOpenApiFile(filePath);

  if (result.errors.length > 0) {
    console.error("❌ Validation errors found:");
    for (const error of result.errors) {
      console.error(`  - [${error.type}] ${error.message}${error.path ? ` (${error.path})` : ""}`);
    }
  }

  if (result.warnings.length > 0) {
    console.warn("⚠️  Validation warnings:");
    for (const warning of result.warnings) {
      console.warn(`  - [${warning.type}] ${warning.message}${warning.path ? ` (${warning.path})` : ""}`);
    }
  }

  if (result.isValid) {
    console.log("✅ OpenAPI schema is valid");
    process.exit(0);
  } else {
    console.error(`❌ Found ${result.errors.length} error(s)`);
    process.exit(1);
  }
};

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});

