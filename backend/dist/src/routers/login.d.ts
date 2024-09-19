export declare const loginRouter: import("@trpc/server").CreateRouterInner<import("@trpc/server").RootConfig<{
    ctx: {
        fastify: import("fastify").FastifyInstance<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>;
        request: import("fastify").FastifyRequest<import("fastify").RouteGenericInterface, import("fastify").RawServerDefault, import("http").IncomingMessage, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown, import("fastify").FastifyBaseLogger, import("fastify/types/type-provider").ResolveFastifyRequestType<import("fastify").FastifyTypeProviderDefault, import("fastify").FastifySchema, import("fastify").RouteGenericInterface>>;
        reply: import("fastify").FastifyReply<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown>;
    };
    meta: object;
    errorShape: import("@trpc/server").DefaultErrorShape;
    transformer: import("@trpc/server").DefaultDataTransformer;
}>, {
    login: import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: {
                fastify: import("fastify").FastifyInstance<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>;
                request: import("fastify").FastifyRequest<import("fastify").RouteGenericInterface, import("fastify").RawServerDefault, import("http").IncomingMessage, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown, import("fastify").FastifyBaseLogger, import("fastify/types/type-provider").ResolveFastifyRequestType<import("fastify").FastifyTypeProviderDefault, import("fastify").FastifySchema, import("fastify").RouteGenericInterface>>;
                reply: import("fastify").FastifyReply<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown>;
            };
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: {
            fastify: import("fastify").FastifyInstance<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>;
            request: import("fastify").FastifyRequest<import("fastify").RouteGenericInterface, import("fastify").RawServerDefault, import("http").IncomingMessage, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown, import("fastify").FastifyBaseLogger, import("fastify/types/type-provider").ResolveFastifyRequestType<import("fastify").FastifyTypeProviderDefault, import("fastify").FastifySchema, import("fastify").RouteGenericInterface>>;
            reply: import("fastify").FastifyReply<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown>;
        };
        _input_in: {
            loginData: {
                email: string;
                password: string;
            };
        };
        _input_out: {
            loginData: {
                email: string;
                password: string;
            };
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, string | undefined>;
}>;
//# sourceMappingURL=login.d.ts.map