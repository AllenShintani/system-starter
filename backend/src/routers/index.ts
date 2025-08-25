import { initTRPC } from "@trpc/server";

import { signinRouter } from "./signin";
import { signupRouter } from "./signup";
import { userRouter } from "./user";
import { videoRouter } from "./video";

const t = initTRPC.create();

export const appRouter = t.router({
  signupRouter,
  signinRouter,
  userRouter,
  videoRouter,
});
export type AppRouter = typeof appRouter;
