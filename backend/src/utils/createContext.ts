import { initTRPC } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

const createContext = ({
  req,
  res,
}: CreateFastifyContextOptions): {
  fastify: typeof req.server;
  request: typeof req;
  reply: typeof res;
} => ({
  fastify: req.server,
  request: req,
  reply: res,
});

export const t = initTRPC.context<typeof createContext>().create();
