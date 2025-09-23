import type { VideoCreateInput, VideoUpdateInput } from "../../../../schemas/dto/video.dto";
import type { VideoBase } from "../../../../schemas/domain/video";
import type {
  SignedUpload,
  FileUploadRequest,
} from "../../../../schemas/infrastructure/s3.schemas";
import type { VideoPorts, VideoStoragePorts } from "../ports/video";

export type VideoMutationResult = {
  video: VideoBase;
  videoUpload?: SignedUpload;
  thumbnailUpload?: SignedUpload;
};

const applyUploads = async (
  ports: VideoPorts,
  storage: VideoStoragePorts,
  videoId: string,
  current: VideoBase,
  files: {
    videoFile?: FileUploadRequest;
    thumbnailFile?: FileUploadRequest;
  }
): Promise<VideoMutationResult> => {
  const videoUpload = files.videoFile
    ? await storage.createUpload(files.videoFile, videoId, "video")
    : undefined;
  const thumbnailUpload = files.thumbnailFile
    ? await storage.createUpload(files.thumbnailFile, videoId, "thumbnail")
    : undefined;

  if (!videoUpload && !thumbnailUpload) {
    return { video: current };
  }

  const updates = {
    videoUrl: videoUpload?.url,
    thumbnailUrl: thumbnailUpload?.url,
  };

  const next = await ports.update(videoId, updates);

  return {
    video: next,
    videoUpload,
    thumbnailUpload,
  };
};

export const listVideos = async (ports: VideoPorts): Promise<VideoBase[]> => ports.list();

export const getVideoById = async (ports: VideoPorts, videoId: string): Promise<VideoBase | null> =>
  ports.findById(videoId);

export const createVideo = async (
  ports: VideoPorts,
  storage: VideoStoragePorts,
  authorId: string,
  input: VideoCreateInput
): Promise<VideoMutationResult> => {
  const created = await ports.create({
    title: input.title,
    description: input.description,
    duration: input.duration,
    authorId,
    videoUrl: "",
    thumbnailUrl: "",
  });

  return applyUploads(ports, storage, created.id, created, {
    videoFile: input.videoFile,
    thumbnailFile: input.thumbnailFile,
  });
};

export const updateVideo = async (
  ports: VideoPorts,
  storage: VideoStoragePorts,
  authorId: string,
  input: VideoUpdateInput
): Promise<VideoMutationResult> => {
  const updated = await ports.update(input.id, {
    title: input.title,
    description: input.description,
    duration: input.duration,
    authorId,
  });

  return applyUploads(ports, storage, input.id, updated, {
    videoFile: input.videoFile,
    thumbnailFile: input.thumbnailFile,
  });
};
