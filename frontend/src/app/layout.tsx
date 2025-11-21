import "../styles/globals.css";

import type { ReactNode } from "react";

import { ClerkProvider } from "@clerk/nextjs";

import { jaJP } from "@/localization/ja";
import { TRPCProvider } from "@/providers/TRPCProvider";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Starter",
  description: "A modern web application starter",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
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
};

export default RootLayout;
