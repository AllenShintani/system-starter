/**
 * フロントエンド環境変数設定
 * Next.jsではビルド時に環境変数が埋め込まれるため、
 * NEXT_PUBLIC_プレフィックスが必要
 *
 * Next.jsはビルド時に環境変数を文字列リテラルとして置換するため、
 * process.env[key]のような動的アクセスは機能しない
 */

const requiredEnvVars = {
  NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  NEXT_PUBLIC_API_HOST: process.env.NEXT_PUBLIC_API_HOST,
  NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
}

// 環境変数の存在を検証
function validateEnvVarsExist(envVars: Record<string, string | undefined>): void {
  for (const [key, value] of Object.entries(envVars)) {
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`)
    }
  }
}

// NODE_ENVの検証
function validateNodeEnv(nodeEnv: string | undefined): 'development' | 'production' | 'test' {
  if (nodeEnv !== 'development' && nodeEnv !== 'production' && nodeEnv !== 'test') {
    throw new Error(`Invalid NEXT_PUBLIC_NODE_ENV: ${nodeEnv}`)
  }
  return nodeEnv
}

// 型安全な環境変数の取得
function getValidatedEnvVars(): {
  NEXT_PUBLIC_NODE_ENV: 'development' | 'production' | 'test'
  NEXT_PUBLIC_API_HOST: string
  NEXT_PUBLIC_WS_URL: string
} {
  validateEnvVarsExist(requiredEnvVars)
  const nodeEnv = validateNodeEnv(requiredEnvVars.NEXT_PUBLIC_NODE_ENV)

  // TypeScriptの型システムに環境変数の存在を保証
  const apiHost = requiredEnvVars.NEXT_PUBLIC_API_HOST
  const wsUrl = requiredEnvVars.NEXT_PUBLIC_WS_URL

  if (!apiHost || !wsUrl) {
    throw new Error('Required environment variables are missing')
  }

  return {
    NEXT_PUBLIC_NODE_ENV: nodeEnv,
    NEXT_PUBLIC_API_HOST: apiHost,
    NEXT_PUBLIC_WS_URL: wsUrl,
  }
}

const validatedEnvVars = getValidatedEnvVars()

export const config = {
  NODE_ENV: validatedEnvVars.NEXT_PUBLIC_NODE_ENV,
  API_HOST: validatedEnvVars.NEXT_PUBLIC_API_HOST,
  WS_URL: validatedEnvVars.NEXT_PUBLIC_WS_URL,
} as const
export type Config = typeof config
