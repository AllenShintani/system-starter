"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("@trpc/server/adapters/fastify");
const fastify_2 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const routers_1 = require("./routers");
const client_1 = require("../prisma/client");
const server = (0, fastify_2.default)();
server.register(jwt_1.default, {
    secret: 'supersecret',
});
server.register(cookie_1.default);
// tRPCプラグインを登録
server.register(fastify_1.fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
        router: routers_1.appRouter,
        createContext: ({ req, res }) => ({
            fastify: server,
            request: req,
            reply: res,
        }),
    },
});
server.register(cors_1.default, {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
});
// サーバーを起動
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client_1.prisma.$connect();
        yield server.listen({ port: 8080 });
        console.log(`Server listening on port: http://localhost:8080`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
start().catch((err) => {
    console.error('Error starting server:', err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map