export declare const appRouter: import("@trpc/server").CreateRouterInner<
  import("@trpc/server").RootConfig<{
    ctx: object;
    meta: object;
    errorShape: import("@trpc/server").DefaultErrorShape;
    transformer: import("@trpc/server").DefaultDataTransformer;
  }>,
  {
    signupRouter: import("@trpc/server").CreateRouterInner<
      import("@trpc/server").RootConfig<{
        ctx: {
          fastify: import("fastify").FastifyInstance<
            import("fastify").RawServerDefault,
            import("http").IncomingMessage,
            import("http").ServerResponse<import("http").IncomingMessage>,
            import("fastify").FastifyBaseLogger,
            import("fastify").FastifyTypeProviderDefault
          >;
          request: import("fastify").FastifyRequest<
            import("fastify").RouteGenericInterface,
            import("fastify").RawServerDefault,
            import("http").IncomingMessage,
            import("fastify").FastifySchema,
            import("fastify").FastifyTypeProviderDefault,
            unknown,
            import("fastify").FastifyBaseLogger,
            import("fastify/types/type-provider").ResolveFastifyRequestType<
              import("fastify").FastifyTypeProviderDefault,
              import("fastify").FastifySchema,
              import("fastify").RouteGenericInterface
            >
          >;
          reply: import("fastify").FastifyReply<
            import("fastify").RawServerDefault,
            import("http").IncomingMessage,
            import("http").ServerResponse<import("http").IncomingMessage>,
            import("fastify").RouteGenericInterface,
            unknown,
            import("fastify").FastifySchema,
            import("fastify").FastifyTypeProviderDefault,
            unknown
          >;
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
      }>,
      {
        signup: import("@trpc/server").BuildProcedure<
          "mutation",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: {
                fastify: import("fastify").FastifyInstance<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").FastifyBaseLogger,
                  import("fastify").FastifyTypeProviderDefault
                >;
                request: import("fastify").FastifyRequest<
                  import("fastify").RouteGenericInterface,
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown,
                  import("fastify").FastifyBaseLogger,
                  import("fastify/types/type-provider").ResolveFastifyRequestType<
                    import("fastify").FastifyTypeProviderDefault,
                    import("fastify").FastifySchema,
                    import("fastify").RouteGenericInterface
                  >
                >;
                reply: import("fastify").FastifyReply<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").RouteGenericInterface,
                  unknown,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown
                >;
              };
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              fastify: import("fastify").FastifyInstance<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").FastifyBaseLogger,
                import("fastify").FastifyTypeProviderDefault
              >;
              request: import("fastify").FastifyRequest<
                import("fastify").RouteGenericInterface,
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown,
                import("fastify").FastifyBaseLogger,
                import("fastify/types/type-provider").ResolveFastifyRequestType<
                  import("fastify").FastifyTypeProviderDefault,
                  import("fastify").FastifySchema,
                  import("fastify").RouteGenericInterface
                >
              >;
              reply: import("fastify").FastifyReply<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").RouteGenericInterface,
                unknown,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown
              >;
            };
            _input_in: {
              userData: {
                email: string;
                password: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
                fullName?: string | undefined;
              };
            };
            _input_out: {
              userData: {
                email: string;
                password: string;
                firstName?: string | undefined;
                lastName?: string | undefined;
                fullName?: string | undefined;
              };
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          {
            success: boolean;
            user: {
              id: string;
              email: string;
              name: string | null;
              avatarUrl: string | null;
            };
            redirect: string;
          }
        >;
      }
    >;
    loginRouter: import("@trpc/server").CreateRouterInner<
      import("@trpc/server").RootConfig<{
        ctx: {
          fastify: import("fastify").FastifyInstance<
            import("fastify").RawServerDefault,
            import("http").IncomingMessage,
            import("http").ServerResponse<import("http").IncomingMessage>,
            import("fastify").FastifyBaseLogger,
            import("fastify").FastifyTypeProviderDefault
          >;
          request: import("fastify").FastifyRequest<
            import("fastify").RouteGenericInterface,
            import("fastify").RawServerDefault,
            import("http").IncomingMessage,
            import("fastify").FastifySchema,
            import("fastify").FastifyTypeProviderDefault,
            unknown,
            import("fastify").FastifyBaseLogger,
            import("fastify/types/type-provider").ResolveFastifyRequestType<
              import("fastify").FastifyTypeProviderDefault,
              import("fastify").FastifySchema,
              import("fastify").RouteGenericInterface
            >
          >;
          reply: import("fastify").FastifyReply<
            import("fastify").RawServerDefault,
            import("http").IncomingMessage,
            import("http").ServerResponse<import("http").IncomingMessage>,
            import("fastify").RouteGenericInterface,
            unknown,
            import("fastify").FastifySchema,
            import("fastify").FastifyTypeProviderDefault,
            unknown
          >;
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
      }>,
      {
        login: import("@trpc/server").BuildProcedure<
          "mutation",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: {
                fastify: import("fastify").FastifyInstance<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").FastifyBaseLogger,
                  import("fastify").FastifyTypeProviderDefault
                >;
                request: import("fastify").FastifyRequest<
                  import("fastify").RouteGenericInterface,
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown,
                  import("fastify").FastifyBaseLogger,
                  import("fastify/types/type-provider").ResolveFastifyRequestType<
                    import("fastify").FastifyTypeProviderDefault,
                    import("fastify").FastifySchema,
                    import("fastify").RouteGenericInterface
                  >
                >;
                reply: import("fastify").FastifyReply<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").RouteGenericInterface,
                  unknown,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown
                >;
              };
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              fastify: import("fastify").FastifyInstance<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").FastifyBaseLogger,
                import("fastify").FastifyTypeProviderDefault
              >;
              request: import("fastify").FastifyRequest<
                import("fastify").RouteGenericInterface,
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown,
                import("fastify").FastifyBaseLogger,
                import("fastify/types/type-provider").ResolveFastifyRequestType<
                  import("fastify").FastifyTypeProviderDefault,
                  import("fastify").FastifySchema,
                  import("fastify").RouteGenericInterface
                >
              >;
              reply: import("fastify").FastifyReply<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").RouteGenericInterface,
                unknown,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown
              >;
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
          },
          {
            success: boolean;
            user: {
              id: string;
              email: string;
              name: string | null;
              avatarUrl: string | null;
            };
            redirect: string;
          }
        >;
        logout: import("@trpc/server").BuildProcedure<
          "mutation",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: {
                fastify: import("fastify").FastifyInstance<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").FastifyBaseLogger,
                  import("fastify").FastifyTypeProviderDefault
                >;
                request: import("fastify").FastifyRequest<
                  import("fastify").RouteGenericInterface,
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown,
                  import("fastify").FastifyBaseLogger,
                  import("fastify/types/type-provider").ResolveFastifyRequestType<
                    import("fastify").FastifyTypeProviderDefault,
                    import("fastify").FastifySchema,
                    import("fastify").RouteGenericInterface
                  >
                >;
                reply: import("fastify").FastifyReply<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").RouteGenericInterface,
                  unknown,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown
                >;
              };
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _ctx_out: {
              fastify: import("fastify").FastifyInstance<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").FastifyBaseLogger,
                import("fastify").FastifyTypeProviderDefault
              >;
              request: import("fastify").FastifyRequest<
                import("fastify").RouteGenericInterface,
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown,
                import("fastify").FastifyBaseLogger,
                import("fastify/types/type-provider").ResolveFastifyRequestType<
                  import("fastify").FastifyTypeProviderDefault,
                  import("fastify").FastifySchema,
                  import("fastify").RouteGenericInterface
                >
              >;
              reply: import("fastify").FastifyReply<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").RouteGenericInterface,
                unknown,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown
              >;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
            _meta: object;
          },
          {
            success: boolean;
            redirect: string;
          }
        >;
        checkAuth: import("@trpc/server").BuildProcedure<
          "query",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: {
                fastify: import("fastify").FastifyInstance<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").FastifyBaseLogger,
                  import("fastify").FastifyTypeProviderDefault
                >;
                request: import("fastify").FastifyRequest<
                  import("fastify").RouteGenericInterface,
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown,
                  import("fastify").FastifyBaseLogger,
                  import("fastify/types/type-provider").ResolveFastifyRequestType<
                    import("fastify").FastifyTypeProviderDefault,
                    import("fastify").FastifySchema,
                    import("fastify").RouteGenericInterface
                  >
                >;
                reply: import("fastify").FastifyReply<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").RouteGenericInterface,
                  unknown,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown
                >;
              };
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _ctx_out: {
              fastify: import("fastify").FastifyInstance<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").FastifyBaseLogger,
                import("fastify").FastifyTypeProviderDefault
              >;
              request: import("fastify").FastifyRequest<
                import("fastify").RouteGenericInterface,
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown,
                import("fastify").FastifyBaseLogger,
                import("fastify/types/type-provider").ResolveFastifyRequestType<
                  import("fastify").FastifyTypeProviderDefault,
                  import("fastify").FastifySchema,
                  import("fastify").RouteGenericInterface
                >
              >;
              reply: import("fastify").FastifyReply<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").RouteGenericInterface,
                unknown,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown
              >;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
            _meta: object;
          },
          | {
              authenticated: boolean;
              redirect: string;
              user: null;
            }
          | {
              authenticated: boolean;
              user: {
                id: string;
                email: string;
                name: string | null;
                avatarUrl: string | null;
              };
              redirect: null;
            }
        >;
      }
    >;
    userRouter: import("@trpc/server").CreateRouterInner<
      import("@trpc/server").RootConfig<{
        ctx: {
          fastify: import("fastify").FastifyInstance<
            import("fastify").RawServerDefault,
            import("http").IncomingMessage,
            import("http").ServerResponse<import("http").IncomingMessage>,
            import("fastify").FastifyBaseLogger,
            import("fastify").FastifyTypeProviderDefault
          >;
          request: import("fastify").FastifyRequest<
            import("fastify").RouteGenericInterface,
            import("fastify").RawServerDefault,
            import("http").IncomingMessage,
            import("fastify").FastifySchema,
            import("fastify").FastifyTypeProviderDefault,
            unknown,
            import("fastify").FastifyBaseLogger,
            import("fastify/types/type-provider").ResolveFastifyRequestType<
              import("fastify").FastifyTypeProviderDefault,
              import("fastify").FastifySchema,
              import("fastify").RouteGenericInterface
            >
          >;
          reply: import("fastify").FastifyReply<
            import("fastify").RawServerDefault,
            import("http").IncomingMessage,
            import("http").ServerResponse<import("http").IncomingMessage>,
            import("fastify").RouteGenericInterface,
            unknown,
            import("fastify").FastifySchema,
            import("fastify").FastifyTypeProviderDefault,
            unknown
          >;
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
      }>,
      {
        getUser: import("@trpc/server").BuildProcedure<
          "query",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: {
                fastify: import("fastify").FastifyInstance<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").FastifyBaseLogger,
                  import("fastify").FastifyTypeProviderDefault
                >;
                request: import("fastify").FastifyRequest<
                  import("fastify").RouteGenericInterface,
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown,
                  import("fastify").FastifyBaseLogger,
                  import("fastify/types/type-provider").ResolveFastifyRequestType<
                    import("fastify").FastifyTypeProviderDefault,
                    import("fastify").FastifySchema,
                    import("fastify").RouteGenericInterface
                  >
                >;
                reply: import("fastify").FastifyReply<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").RouteGenericInterface,
                  unknown,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown
                >;
              };
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _ctx_out: {
              fastify: import("fastify").FastifyInstance<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").FastifyBaseLogger,
                import("fastify").FastifyTypeProviderDefault
              >;
              request: import("fastify").FastifyRequest<
                import("fastify").RouteGenericInterface,
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown,
                import("fastify").FastifyBaseLogger,
                import("fastify/types/type-provider").ResolveFastifyRequestType<
                  import("fastify").FastifyTypeProviderDefault,
                  import("fastify").FastifySchema,
                  import("fastify").RouteGenericInterface
                >
              >;
              reply: import("fastify").FastifyReply<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").RouteGenericInterface,
                unknown,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown
              >;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
            _meta: object;
          },
          {
            email: string;
            firstName: string | null;
            lastName: string | null;
            profilePicture: string | null;
            id: string;
          }
        >;
        update: import("@trpc/server").BuildProcedure<
          "mutation",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: {
                fastify: import("fastify").FastifyInstance<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").FastifyBaseLogger,
                  import("fastify").FastifyTypeProviderDefault
                >;
                request: import("fastify").FastifyRequest<
                  import("fastify").RouteGenericInterface,
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown,
                  import("fastify").FastifyBaseLogger,
                  import("fastify/types/type-provider").ResolveFastifyRequestType<
                    import("fastify").FastifyTypeProviderDefault,
                    import("fastify").FastifySchema,
                    import("fastify").RouteGenericInterface
                  >
                >;
                reply: import("fastify").FastifyReply<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").RouteGenericInterface,
                  unknown,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown
                >;
              };
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              fastify: import("fastify").FastifyInstance<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").FastifyBaseLogger,
                import("fastify").FastifyTypeProviderDefault
              >;
              request: import("fastify").FastifyRequest<
                import("fastify").RouteGenericInterface,
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown,
                import("fastify").FastifyBaseLogger,
                import("fastify/types/type-provider").ResolveFastifyRequestType<
                  import("fastify").FastifyTypeProviderDefault,
                  import("fastify").FastifySchema,
                  import("fastify").RouteGenericInterface
                >
              >;
              reply: import("fastify").FastifyReply<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").RouteGenericInterface,
                unknown,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown
              >;
            };
            _input_in: {
              firstName?: string | undefined;
              lastName?: string | undefined;
              profilePicture?:
                | {
                    fileName: string;
                    fileType: string;
                  }
                | undefined;
            };
            _input_out: {
              firstName?: string | undefined;
              lastName?: string | undefined;
              profilePicture?:
                | {
                    fileName: string;
                    fileType: string;
                  }
                | undefined;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          {
            success: boolean;
            user: {
              id: string;
              firstName: string | null;
              lastName: string | null;
              email: string;
              profilePicture: string | null;
            };
            signedUrl?: string;
            profilePictureUrl?: string;
          }
        >;
      }
    >;
    videoRouter: import("@trpc/server").CreateRouterInner<
      import("@trpc/server").RootConfig<{
        ctx: {
          fastify: import("fastify").FastifyInstance<
            import("fastify").RawServerDefault,
            import("http").IncomingMessage,
            import("http").ServerResponse<import("http").IncomingMessage>,
            import("fastify").FastifyBaseLogger,
            import("fastify").FastifyTypeProviderDefault
          >;
          request: import("fastify").FastifyRequest<
            import("fastify").RouteGenericInterface,
            import("fastify").RawServerDefault,
            import("http").IncomingMessage,
            import("fastify").FastifySchema,
            import("fastify").FastifyTypeProviderDefault,
            unknown,
            import("fastify").FastifyBaseLogger,
            import("fastify/types/type-provider").ResolveFastifyRequestType<
              import("fastify").FastifyTypeProviderDefault,
              import("fastify").FastifySchema,
              import("fastify").RouteGenericInterface
            >
          >;
          reply: import("fastify").FastifyReply<
            import("fastify").RawServerDefault,
            import("http").IncomingMessage,
            import("http").ServerResponse<import("http").IncomingMessage>,
            import("fastify").RouteGenericInterface,
            unknown,
            import("fastify").FastifySchema,
            import("fastify").FastifyTypeProviderDefault,
            unknown
          >;
        };
        meta: object;
        errorShape: import("@trpc/server").DefaultErrorShape;
        transformer: import("@trpc/server").DefaultDataTransformer;
      }>,
      {
        getAllVideoes: import("@trpc/server").BuildProcedure<
          "query",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: {
                fastify: import("fastify").FastifyInstance<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").FastifyBaseLogger,
                  import("fastify").FastifyTypeProviderDefault
                >;
                request: import("fastify").FastifyRequest<
                  import("fastify").RouteGenericInterface,
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown,
                  import("fastify").FastifyBaseLogger,
                  import("fastify/types/type-provider").ResolveFastifyRequestType<
                    import("fastify").FastifyTypeProviderDefault,
                    import("fastify").FastifySchema,
                    import("fastify").RouteGenericInterface
                  >
                >;
                reply: import("fastify").FastifyReply<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").RouteGenericInterface,
                  unknown,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown
                >;
              };
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _ctx_out: {
              fastify: import("fastify").FastifyInstance<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").FastifyBaseLogger,
                import("fastify").FastifyTypeProviderDefault
              >;
              request: import("fastify").FastifyRequest<
                import("fastify").RouteGenericInterface,
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown,
                import("fastify").FastifyBaseLogger,
                import("fastify/types/type-provider").ResolveFastifyRequestType<
                  import("fastify").FastifyTypeProviderDefault,
                  import("fastify").FastifySchema,
                  import("fastify").RouteGenericInterface
                >
              >;
              reply: import("fastify").FastifyReply<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").RouteGenericInterface,
                unknown,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown
              >;
            };
            _input_in: typeof import("@trpc/server").unsetMarker;
            _input_out: typeof import("@trpc/server").unsetMarker;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
            _meta: object;
          },
          {
            id: string;
            description: string;
            title: string;
            duration: number;
            videoUrl: string;
            thumbnailUrl: string;
            authorId: string;
            createdAt: Date;
            updatedAt: Date;
          }[]
        >;
        getVideo: import("@trpc/server").BuildProcedure<
          "query",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: {
                fastify: import("fastify").FastifyInstance<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").FastifyBaseLogger,
                  import("fastify").FastifyTypeProviderDefault
                >;
                request: import("fastify").FastifyRequest<
                  import("fastify").RouteGenericInterface,
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown,
                  import("fastify").FastifyBaseLogger,
                  import("fastify/types/type-provider").ResolveFastifyRequestType<
                    import("fastify").FastifyTypeProviderDefault,
                    import("fastify").FastifySchema,
                    import("fastify").RouteGenericInterface
                  >
                >;
                reply: import("fastify").FastifyReply<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").RouteGenericInterface,
                  unknown,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown
                >;
              };
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              fastify: import("fastify").FastifyInstance<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").FastifyBaseLogger,
                import("fastify").FastifyTypeProviderDefault
              >;
              request: import("fastify").FastifyRequest<
                import("fastify").RouteGenericInterface,
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown,
                import("fastify").FastifyBaseLogger,
                import("fastify/types/type-provider").ResolveFastifyRequestType<
                  import("fastify").FastifyTypeProviderDefault,
                  import("fastify").FastifySchema,
                  import("fastify").RouteGenericInterface
                >
              >;
              reply: import("fastify").FastifyReply<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").RouteGenericInterface,
                unknown,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown
              >;
            };
            _input_in: string;
            _input_out: string;
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          {
            id: string;
            description: string;
            title: string;
            duration: number;
            videoUrl: string;
            thumbnailUrl: string;
            authorId: string;
            createdAt: Date;
            updatedAt: Date;
          } | null
        >;
        putVideo: import("@trpc/server").BuildProcedure<
          "mutation",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: {
                fastify: import("fastify").FastifyInstance<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").FastifyBaseLogger,
                  import("fastify").FastifyTypeProviderDefault
                >;
                request: import("fastify").FastifyRequest<
                  import("fastify").RouteGenericInterface,
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown,
                  import("fastify").FastifyBaseLogger,
                  import("fastify/types/type-provider").ResolveFastifyRequestType<
                    import("fastify").FastifyTypeProviderDefault,
                    import("fastify").FastifySchema,
                    import("fastify").RouteGenericInterface
                  >
                >;
                reply: import("fastify").FastifyReply<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").RouteGenericInterface,
                  unknown,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown
                >;
              };
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              fastify: import("fastify").FastifyInstance<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").FastifyBaseLogger,
                import("fastify").FastifyTypeProviderDefault
              >;
              request: import("fastify").FastifyRequest<
                import("fastify").RouteGenericInterface,
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown,
                import("fastify").FastifyBaseLogger,
                import("fastify/types/type-provider").ResolveFastifyRequestType<
                  import("fastify").FastifyTypeProviderDefault,
                  import("fastify").FastifySchema,
                  import("fastify").RouteGenericInterface
                >
              >;
              reply: import("fastify").FastifyReply<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").RouteGenericInterface,
                unknown,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown
              >;
            };
            _input_in: {
              id: string;
              description: string;
              title: string;
              duration: number;
              data?:
                | {
                    videoUrl: string;
                    thumbnailUrl: string;
                    authorId: string;
                  }
                | undefined;
              videoFile?:
                | {
                    fileName: string;
                    fileType: string;
                  }
                | undefined;
              thumbnailFile?:
                | {
                    fileName: string;
                    fileType: string;
                  }
                | undefined;
            };
            _input_out: {
              id: string;
              description: string;
              title: string;
              duration: number;
              data?:
                | {
                    videoUrl: string;
                    thumbnailUrl: string;
                    authorId: string;
                  }
                | undefined;
              videoFile?:
                | {
                    fileName: string;
                    fileType: string;
                  }
                | undefined;
              thumbnailFile?:
                | {
                    fileName: string;
                    fileType: string;
                  }
                | undefined;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          {
            success: boolean;
            video: {
              id: string;
              description: string;
              title: string;
              duration: number;
              videoUrl: string;
              thumbnailUrl: string;
              authorId: string;
              createdAt: Date;
              updatedAt: Date;
            };
            videoSignedUrl: string | undefined;
            thumbnailSignedUrl: string | undefined;
          }
        >;
        postVideo: import("@trpc/server").BuildProcedure<
          "mutation",
          {
            _config: import("@trpc/server").RootConfig<{
              ctx: {
                fastify: import("fastify").FastifyInstance<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").FastifyBaseLogger,
                  import("fastify").FastifyTypeProviderDefault
                >;
                request: import("fastify").FastifyRequest<
                  import("fastify").RouteGenericInterface,
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown,
                  import("fastify").FastifyBaseLogger,
                  import("fastify/types/type-provider").ResolveFastifyRequestType<
                    import("fastify").FastifyTypeProviderDefault,
                    import("fastify").FastifySchema,
                    import("fastify").RouteGenericInterface
                  >
                >;
                reply: import("fastify").FastifyReply<
                  import("fastify").RawServerDefault,
                  import("http").IncomingMessage,
                  import("http").ServerResponse<import("http").IncomingMessage>,
                  import("fastify").RouteGenericInterface,
                  unknown,
                  import("fastify").FastifySchema,
                  import("fastify").FastifyTypeProviderDefault,
                  unknown
                >;
              };
              meta: object;
              errorShape: import("@trpc/server").DefaultErrorShape;
              transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: {
              fastify: import("fastify").FastifyInstance<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").FastifyBaseLogger,
                import("fastify").FastifyTypeProviderDefault
              >;
              request: import("fastify").FastifyRequest<
                import("fastify").RouteGenericInterface,
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown,
                import("fastify").FastifyBaseLogger,
                import("fastify/types/type-provider").ResolveFastifyRequestType<
                  import("fastify").FastifyTypeProviderDefault,
                  import("fastify").FastifySchema,
                  import("fastify").RouteGenericInterface
                >
              >;
              reply: import("fastify").FastifyReply<
                import("fastify").RawServerDefault,
                import("http").IncomingMessage,
                import("http").ServerResponse<import("http").IncomingMessage>,
                import("fastify").RouteGenericInterface,
                unknown,
                import("fastify").FastifySchema,
                import("fastify").FastifyTypeProviderDefault,
                unknown
              >;
            };
            _input_in: {
              description: string;
              title: string;
              duration: number;
              data?:
                | {
                    videoUrl: string;
                    thumbnailUrl: string;
                    authorId: string;
                  }
                | undefined;
              videoFile?:
                | {
                    fileName: string;
                    fileType: string;
                  }
                | undefined;
              thumbnailFile?:
                | {
                    fileName: string;
                    fileType: string;
                  }
                | undefined;
            };
            _input_out: {
              description: string;
              title: string;
              duration: number;
              data?:
                | {
                    videoUrl: string;
                    thumbnailUrl: string;
                    authorId: string;
                  }
                | undefined;
              videoFile?:
                | {
                    fileName: string;
                    fileType: string;
                  }
                | undefined;
              thumbnailFile?:
                | {
                    fileName: string;
                    fileType: string;
                  }
                | undefined;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
          },
          {
            success: boolean;
            video: {
              id: string;
              description: string;
              title: string;
              duration: number;
              videoUrl: string;
              thumbnailUrl: string;
              authorId: string;
              createdAt: Date;
              updatedAt: Date;
            };
            videoSignedUrl: string | undefined;
            thumbnailSignedUrl: string | undefined;
          }
        >;
      }
    >;
  }
>;
export type AppRouter = typeof appRouter;
//# sourceMappingURL=index.d.ts.map
