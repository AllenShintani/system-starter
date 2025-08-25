import { initTRPC } from "@trpc/server";

import { signinRouter } from "./signin";
import { userRouter } from "./user";
import { videoRouter } from "./video";

const t = initTRPC.create();

export const appRouter = t.router({
  signinRouter,
  userRouter,
  videoRouter,
});
export type AppRouter = typeof appRouter;
