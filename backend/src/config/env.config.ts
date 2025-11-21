import * as dotenv from "dotenv";

dotenv.config();

enum NodeEnv {
  Development = "development",
  Production = "production",
  Test = "test",
}

const NODE_ENV_VALUES: NodeEnv[] = [NodeEnv.Development, NodeEnv.Production, NodeEnv.Test];

type Config = {
  readonly NODE_ENV: NodeEnv;
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
  readonly CLERK_SECRET_KEY: string;
  readonly isAwsEnabled: () => boolean;
  readonly isStripeEnabled: () => boolean;
};

const ensureEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
  return value;
};

const isNodeEnv = (value: string): value is NodeEnv => NODE_ENV_VALUES.some((env) => env === value);

const parseNodeEnv = (value: string): NodeEnv => {
  if (isNodeEnv(value)) {
    return value;
  }
  console.error(
    `❌ Environment variable 'NODE_ENV' must be one of ${NODE_ENV_VALUES.join(", ")}, got: ${value}`
  );
  process.exit(1);
};

const parsePort = (value: string): number => {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    console.error(`❌ Environment variable 'PORT' must be a number, got: ${value}`);
    process.exit(1);
  }
  return parsed;
};

const createConfig = (): Config => {
  const nodeEnv = parseNodeEnv(ensureEnv("NODE_ENV"));
  const port = parsePort(ensureEnv("PORT"));

  return {
    NODE_ENV: nodeEnv,
    PORT: port,
    DATABASE_URL: ensureEnv("DATABASE_URL"),
    JWT_SECRET: ensureEnv("JWT_SECRET"),
    CORS_ORIGIN: ensureEnv("CORS_ORIGIN"),
    AWS_REGION: ensureEnv("AWS_REGION"),
    AWS_ACCESS_KEY_ID: ensureEnv("AWS_ACCESS_KEY_ID"),
    AWS_SECRET_ACCESS_KEY: ensureEnv("AWS_SECRET_ACCESS_KEY"),
    S3_BUCKET_NAME: ensureEnv("S3_BUCKET_NAME"),
    STRIPE_SECRET_KEY: ensureEnv("STRIPE_SECRET_KEY"),
    STRIPE_WEBHOOK_SECRET: ensureEnv("STRIPE_WEBHOOK_SECRET"),
    CLERK_SECRET_KEY: ensureEnv("CLERK_SECRET_KEY"),
    isAwsEnabled: (): boolean => true,
    isStripeEnabled: (): boolean => true,
  };
};

export const config: Config = createConfig();

export type { Config };
