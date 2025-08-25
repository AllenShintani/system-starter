"use client";

import "../styles/globals.css";
import { trpc } from "../utils/trpc";

import type { ReactNode } from "react";

import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";

function RootLayout({ children }: { children: ReactNode }) {
  const { isLoading, isAuthorized } = useAuth();

  if (isLoading) {
    return (
      <html lang="ja">
        <body>
          <Loading />
        </body>
      </html>
    );
  }

  return (
    <html lang="ja">
      <body>{isAuthorized ? children : <Loading />}</body>
    </html>
  );
}

export default trpc.withTRPC(RootLayout);
