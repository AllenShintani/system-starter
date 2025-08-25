"use client";

import type { ReactNode } from "react";

import { trpc } from "@/utils/trpc";

export const TRPCProvider = trpc.withTRPC(({ children }: { children: ReactNode }) => {
  return <>{children}</>;
}) as React.FC<{ children: ReactNode }>;
