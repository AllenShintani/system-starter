"use client";

import { Box, Typography } from "@mui/material";

import ImageUpload from "@/components/ImageUpload";
import ProfileImage from "@/components/ProfileImage";
import { useS3Image } from "@/hooks/useS3Image";

const Profile = () => {
  const { UserIconUrl, error, isLoading, uploadImage } = useS3Image();

  const handleImageUpload = async (file: File) => {
    try {
      await uploadImage(file);
    } catch (err) {
      console.error("Failed to upload image:", err);
    }
  };

  return (
    <div>
      <Box sx={{ mb: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ProfileImage
          imageUrl={UserIconUrl}
          size={100}
          onImageError={(errorMessage) => console.error(errorMessage)}
        />

        {isLoading && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            画像をアップロード中...
          </Typography>
        )}

        {error && (
          <Typography
            variant="body2"
            color="error"
            sx={{ mt: 1 }}
          >
            エラー: {error}
          </Typography>
        )}

        <Box sx={{ mt: 2 }}>
          <ImageUpload onUpload={handleImageUpload} />
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
