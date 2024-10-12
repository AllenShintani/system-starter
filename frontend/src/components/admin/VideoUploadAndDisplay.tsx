'use client'

import type React from 'react'
import { useState, useRef } from 'react'
import { Button, CircularProgress, Typography, Box, TextField } from '@mui/material'
import { trpc } from '@/utils/trpc'

const VideoUploadAndDisplay: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const postLessonMutation = trpc.videoRouter.postVideo.useMutation()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      setFile(selectedFile)
      setError(null)

      // Get video duration
      const video = document.createElement('video')
      video.preload = 'metadata'
      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src)
        setDuration(Math.round(video.duration))
      }
      video.src = URL.createObjectURL(selectedFile)
    }
  }

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      setThumbnailFile(selectedFile)
      setThumbnailUrl(URL.createObjectURL(selectedFile))
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('動画ファイルが選択されていません')
      return
    }

    if (!thumbnailFile) {
      setError('サムネイル画像が選択されていません')
      return
    }

    if (!title) {
      setError('タイトルを入力してください')
      return
    }

    if (duration <= 0) {
      setError('動画の長さを取得できませんでした')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const result = await postLessonMutation.mutateAsync({
        title,
        description,
        duration,
        videoFile: {
          fileName: file.name,
          fileType: file.type,
        },
        thumbnailFile: {
          fileName: thumbnailFile.name,
          fileType: thumbnailFile.type,
        },
      })

      if (result.videoSignedUrl && result.thumbnailSignedUrl) {
        await Promise.all([
          fetch(result.videoSignedUrl, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type,
            },
          }),
          fetch(result.thumbnailSignedUrl, {
            method: 'PUT',
            body: thumbnailFile,
            headers: {
              'Content-Type': thumbnailFile.type,
            },
          }),
        ])

        setVideoUrl(result.video.videoUrl)
        setThumbnailUrl(result.video.thumbnailUrl)
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`アップロードに失敗しました: ${err.message}`)
      } else {
        setError('アップロードに失敗しました: 不明なエラー')
      }
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
      <TextField
        label="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        label="説明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={3}
      />
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <Button
        variant="contained"
        onClick={() => fileInputRef.current?.click()}
      >
        動画ファイルを選択
      </Button>
      {file && (
        <Typography>
          選択された動画: {file.name} (長さ: {duration}秒)
        </Typography>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleThumbnailChange}
        style={{ display: 'none' }}
        ref={thumbnailInputRef}
      />
      <Button
        variant="contained"
        onClick={() => thumbnailInputRef.current?.click()}
      >
        サムネイル画像を選択
      </Button>
      {thumbnailUrl && (
        <Box sx={{ mt: 2, width: '200px', height: '200px' }}>
          <img
            src={thumbnailUrl}
            alt="Thumbnail"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      )}
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!file || !thumbnailFile || isUploading || !title || duration <= 0}
      >
        {isUploading ? <CircularProgress size={24} /> : 'アップロード'}
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {videoUrl && (
        <Box sx={{ mt: 2, width: '100%', maxWidth: '600px' }}>
          <video
            controls
            width="100%"
            ref={videoRef}
          >
            <source
              src={videoUrl}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Box>
      )}
    </Box>
  )
}

export default VideoUploadAndDisplay
