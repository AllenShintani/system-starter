"use client";

import { useState, useEffect, useCallback } from "react";

import { trpc } from "@/utils/trpc";

export const useS3Image = () => {
  const [UserIconUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: userData,
    isLoading: isUserLoading,
    isError,
    refetch,
  } = trpc.userRouter.getUser.useQuery();
  const updateMutation = trpc.userRouter.update.useMutation();

  useEffect(() => {
    if (isUserLoading) return;

    if (userData) {
      setImageUrl(userData.profilePicture);
      setIsLoading(false);
      return;
    }
    if (isError) {
      setError("Error fetching user data");
    }
    setIsLoading(false);
  }, [userData, isUserLoading, isError]);

  const uploadImage = useCallback(
    async (file: File) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await updateMutation.mutateAsync({
          profilePicture: {
            fileName: file.name,
            fileType: file.type,
          },
        });

        if (!(result.success && result.signedUrl && result.profilePictureUrl)) {
          throw new Error(result.success ? "Failed to get upload URL" : "Failed to update user");
        }

        const uploadResponse = await fetch(result.signedUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });
        if (!uploadResponse.ok) throw new Error("Failed to upload image to S3");

        setImageUrl(result.profilePictureUrl);
        await refetch(); // Userの情報を更新
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    [updateMutation, refetch]
  );

  return { UserIconUrl, error, isLoading, uploadImage };
};
