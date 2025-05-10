import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import type { FastifyInstance } from 'fastify'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { appRouter } from './routers'
import { prisma } from '../prisma/client'
import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import dotenv from 'dotenv'

dotenv.config()

const server: FastifyInstance = Fastify({
  maxParamLength: 5000,
  bodyLimit: 50 * 1024 * 1024, // 50MB
})

// Raw bodyパーサーを追加
server.addContentTypeParser('application/json', { parseAs: 'buffer' }, function (_, body, done) {
  done(null, body)
})

// 環境変数のチェック
const requiredEnvVars = ['JWT_SECRET', 'FRONTEND_URL', 'PORT']
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`${envVar} is not set in environment variables`)
    process.exit(1)
  }
}

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
  sign: {
    algorithm: 'HS256',
    expiresIn: '7d',
  },
  verify: {
    algorithms: ['HS256'],
  },
})

server.register(fastifyCookie)

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: {
    router: appRouter,
    createContext: ({ req, res }: CreateFastifyContextOptions) => ({
      fastify: server,
      request: req,
      reply: res,
    }),
  },
})

server.register(cors, {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
})

server.get('/health', async () => {
  return { status: 'OK' }
})

const start = async () => {
  try {
    await prisma.$connect()
    await server.listen({
      port: parseInt(process.env.PORT || '8080'),
      host: '0.0.0.0',
    })
    console.debug(`Server listening on port: ${process.env.PORT || 8080}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start().catch((err) => {
  console.error('Error starting server:', err)
  process.exit(1)
})
