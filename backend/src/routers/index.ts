import { initTRPC } from "@trpc/server";
import { signupRouter } from "./signup";
import { loginRouter } from "./login";
import { userRouter } from "./user";

const t = initTRPC.create();

export const appRouter = t.router({
  signupRouter,
  loginRouter,
  userRouter,
});
export type AppRouter = typeof appRouter;
