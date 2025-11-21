"use client";

import { useEffect } from "react";

import { useAuth as useClerkAuth, useUser } from "@clerk/nextjs";

import { trpc } from "@/utils/trpc";

export const useAuth = () => {
  const { isLoaded, userId, sessionId, signOut } = useClerkAuth();
  const { user } = useUser();
  const utils = trpc.useUtils();

  // Clerkでサインイン後、バックエンドと同期
  const signinMutation = trpc.signinRouter.signin.useMutation({
    onSuccess: () => {
      utils.signinRouter.checkAuth.invalidate();
    },
  });

  useEffect(() => {
    if (isLoaded && userId && !signinMutation.isLoading) {
      // Clerkでサインインしたら、バックエンドにも通知
      signinMutation.mutate({ clerkUserId: userId });
    }
  }, [isLoaded, userId, signinMutation]);

  return {
    isAuthenticated: !!userId,
    isLoading: !isLoaded || signinMutation.isLoading,
    userId,
    sessionId,
    user,
    signOut,
  };
};
