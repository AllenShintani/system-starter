import { createTRPCReact, type CreateTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@project_name/backend/routers";

type TRPCReactType = CreateTRPCReact<AppRouter, null, null>;

const createTrpcClient = (): TRPCReactType => createTRPCReact<AppRouter, null>();

export const trpc: TRPCReactType = createTrpcClient();
