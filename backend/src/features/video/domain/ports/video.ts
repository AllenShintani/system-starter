import type { VideoBase } from "../../../../schemas/domain/video";
import type {
  FileUploadRequest,
  SignedUpload,
} from "../../../../schemas/infrastructure/s3.schemas";

export type VideoCreateData = {
  title: string;
  description: string;
  duration: number;
  authorId: string;
  videoUrl: string;
  thumbnailUrl: string;
};

export type VideoUpdateData = {
  title?: string;
  description?: string;
  duration?: number;
  authorId?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
};

export type VideoPorts = {
  list: () => Promise<VideoBase[]>;
  findById: (id: string) => Promise<VideoBase | null>;
  create: (data: VideoCreateData) => Promise<VideoBase>;
  update: (id: string, data: VideoUpdateData) => Promise<VideoBase>;
};

export type VideoStoragePorts = {
  createUpload: (
    file: FileUploadRequest,
    videoId: string,
    target: "video" | "thumbnail"
  ) => Promise<SignedUpload>;
};
