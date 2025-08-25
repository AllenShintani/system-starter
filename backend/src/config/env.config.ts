import * as dotenv from "dotenv";

dotenv.config();

function createConfig(): {
  readonly NODE_ENV: "development" | "production" | "test";
  readonly PORT: number;
  readonly DATABASE_URL: string;
  readonly JWT_SECRET: string;
  readonly CORS_ORIGIN: string;
  readonly AWS_REGION: string;
  readonly AWS_ACCESS_KEY_ID: string;
  readonly AWS_SECRET_ACCESS_KEY: string;
  readonly S3_BUCKET_NAME: string;
  readonly STRIPE_SECRET_KEY: string;
  readonly STRIPE_WEBHOOK_SECRET: string;
  readonly FIREBASE_API_KEY: string;
  readonly FIREBASE_AUTH_DOMAIN: string;
  readonly FIREBASE_PROJECT_ID: string;
  readonly FIREBASE_STORAGE_BUCKET: string;
  readonly FIREBASE_MESSAGING_SENDER_ID: string;
  readonly FIREBASE_APP_ID: string;
  readonly isAwsEnabled: () => boolean;
  readonly isStripeEnabled: () => boolean;
  readonly isFirebaseEnabled: () => boolean;
} {
  const get = (key: string): string => {
    const value = process.env[key];
    if (!value) {
      console.error(`❌ Missing required environment variable: ${key}`);
      process.exit(1);
    }
    return value;
  };

  const PORT = Number(get("PORT"));
  if (isNaN(PORT)) {
    console.error(`❌ Environment variable 'PORT' must be a number, got: ${process.env.PORT}`);
    process.exit(1);
  }

  return {
    NODE_ENV: get("NODE_ENV") as "development" | "production" | "test",
    PORT,
    DATABASE_URL: get("DATABASE_URL"),
    JWT_SECRET: get("JWT_SECRET"),
    CORS_ORIGIN: get("CORS_ORIGIN"),
    AWS_REGION: get("AWS_REGION"),
    AWS_ACCESS_KEY_ID: get("AWS_ACCESS_KEY_ID"),
    AWS_SECRET_ACCESS_KEY: get("AWS_SECRET_ACCESS_KEY"),
    S3_BUCKET_NAME: get("S3_BUCKET_NAME"),
    STRIPE_SECRET_KEY: get("STRIPE_SECRET_KEY"),
    STRIPE_WEBHOOK_SECRET: get("STRIPE_WEBHOOK_SECRET"),
    FIREBASE_API_KEY: get("FIREBASE_API_KEY"),
    FIREBASE_AUTH_DOMAIN: get("FIREBASE_AUTH_DOMAIN"),
    FIREBASE_PROJECT_ID: get("FIREBASE_PROJECT_ID"),
    FIREBASE_STORAGE_BUCKET: get("FIREBASE_STORAGE_BUCKET"),
    FIREBASE_MESSAGING_SENDER_ID: get("FIREBASE_MESSAGING_SENDER_ID"),
    FIREBASE_APP_ID: get("FIREBASE_APP_ID"),

    isAwsEnabled: (): boolean => true,
    isStripeEnabled: (): boolean => true,
    isFirebaseEnabled: (): boolean => true,
  } as const;
}

export const config = createConfig();
export type Config = typeof config;
