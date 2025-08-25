import { Button, CircularProgress, Box, Typography } from "@mui/material";
import { useState } from "react";

import ProfileImage from "./ProfileImage";

import type React from "react";

interface ImageUploadProps {
  initialImageUrl?: string | null;
  onUpload: (file: File) => Promise<void>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ initialImageUrl, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      await onUpload(file);
      // Note: The actual update of the image URL will be handled by the parent component
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(
        `画像のアップロードに失敗しました: ${
          error instanceof Error ? error.message : "不明なエラー"
        }`
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <ProfileImage
        imageUrl={previewUrl}
        size={150}
        onImageError={(errorMessage) => setError(errorMessage)}
      />
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="contained"
          component="span"
        >
          画像を選択
        </Button>
      </label>
      {file && (
        <Button
          onClick={handleUpload}
          disabled={uploading}
          variant="contained"
          color="primary"
        >
          {uploading ? <CircularProgress size={24} /> : "アップロード"}
        </Button>
      )}
      {error && (
        <Typography
          variant="body2"
          color="error"
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload;
