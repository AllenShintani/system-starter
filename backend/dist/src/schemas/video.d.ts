import z from "zod";
export declare const videoSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    duration: z.ZodNumber;
    videoFile: z.ZodOptional<z.ZodObject<{
        fileName: z.ZodString;
        fileType: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        fileName: string;
        fileType: string;
    }, {
        fileName: string;
        fileType: string;
    }>>;
    thumbnailFile: z.ZodOptional<z.ZodObject<{
        fileName: z.ZodString;
        fileType: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        fileName: string;
        fileType: string;
    }, {
        fileName: string;
        fileType: string;
    }>>;
    data: z.ZodOptional<z.ZodObject<{
        videoUrl: z.ZodString;
        thumbnailUrl: z.ZodString;
        authorId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        videoUrl: string;
        thumbnailUrl: string;
        authorId: string;
    }, {
        videoUrl: string;
        thumbnailUrl: string;
        authorId: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    description: string;
    title: string;
    duration: number;
    data?: {
        videoUrl: string;
        thumbnailUrl: string;
        authorId: string;
    } | undefined;
    videoFile?: {
        fileName: string;
        fileType: string;
    } | undefined;
    thumbnailFile?: {
        fileName: string;
        fileType: string;
    } | undefined;
}, {
    description: string;
    title: string;
    duration: number;
    data?: {
        videoUrl: string;
        thumbnailUrl: string;
        authorId: string;
    } | undefined;
    videoFile?: {
        fileName: string;
        fileType: string;
    } | undefined;
    thumbnailFile?: {
        fileName: string;
        fileType: string;
    } | undefined;
}>;
export type VideoInput = z.infer<typeof videoSchema>;
//# sourceMappingURL=video.d.ts.map