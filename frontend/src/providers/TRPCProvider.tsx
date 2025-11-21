"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

import { config } from "@/config/env.config";
import { trpc } from "@/utils/trpc";

type TRPCProviderProps = {
  children: ReactNode;
};

export const TRPCProvider = ({ children }: TRPCProviderProps): JSX.Element => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${config.API_HOST}/trpc`,
          fetch: (url, options) =>
            fetch(url, {
              ...options,
              credentials: "include",
            }),
        }),
      ],
    })
  );

  return (
    <trpc.Provider
      client={trpcClient}
      queryClient={queryClient}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
