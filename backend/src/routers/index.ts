import { initTRPC } from "@trpc/server";
import { signupRouter } from "./signup";
import { loginRouter } from "./login";
import { userRouter } from "./user";
import { videoRouter } from "./video";

const t = initTRPC.create();

export const appRouter = t.router({
  signupRouter,
  loginRouter,
  userRouter,
  videoRouter,
});
export type AppRouter = typeof appRouter;
