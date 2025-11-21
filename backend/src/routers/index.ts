import { initTRPC } from "@trpc/server";

import { signinRouter } from "@/routers/signin";
import { userRouter } from "@/routers/user";
import { videoRouter } from "@/routers/video";

const t = initTRPC.create();

export const appRouter = t.router({
  signinRouter,
  userRouter,
  videoRouter,
});
export type AppRouter = typeof appRouter;
