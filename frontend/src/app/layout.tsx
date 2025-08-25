import "../styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { jaJP } from "@/localization/ja";
import { TRPCProvider } from "@/providers/TRPCProvider";

export const metadata: Metadata = {
  title: "System Starter",
  description: "A modern web application starter",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      localization={jaJP}
      signInUrl="/signin"
      signUpUrl="/signup"
    >
      <html lang="ja">
        <body>
          <TRPCProvider>{children}</TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
