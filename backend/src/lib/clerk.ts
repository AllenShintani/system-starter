import { createClerkClient } from "@clerk/backend";

import { config } from "@/config/env.config";

export const clerkClient = createClerkClient({
  secretKey: config.CLERK_SECRET_KEY,
});

/**
 * Clerkセッションを検証してユーザー情報を取得
 */
export const verifyClerkSession = async (
  sessionId: string,
  sessionToken: string
): Promise<ReturnType<typeof clerkClient.users.getUser> | null> => {
  try {
    const session = await clerkClient.sessions.verifySession(sessionId, sessionToken);
    if (!session) {
      return null;
    }

    return await clerkClient.users.getUser(session.userId);
  } catch (error) {
    console.error("Error verifying Clerk session:", error);
    return null;
  }
};

/**
 * Clerk User IDからユーザー情報を取得
 */
export const getClerkUser = async (
  userId: string
): Promise<ReturnType<typeof clerkClient.users.getUser> | null> => {
  try {
    return await clerkClient.users.getUser(userId);
  } catch (error) {
    console.error("Error getting Clerk user:", error);
    return null;
  }
};
