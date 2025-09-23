import { z } from "zod";
import type { Prisma } from "@prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "clerkUserId",
  "email",
  "userName",
  "profilePicture",
]);

export const VideoScalarFieldEnumSchema = z.enum([
  "id",
  "title",
  "description",
  "videoUrl",
  "thumbnailUrl",
  "duration",
  "createdAt",
  "updatedAt",
  "authorId",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const NullsOrderSchema = z.enum(["first", "last"]);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  clerkUserId: z.string(),
  email: z.string(),
  userName: z.string(),
  profilePicture: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// VIDEO SCHEMA
/////////////////////////////////////////

export const VideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  videoUrl: z.string(),
  thumbnailUrl: z.string(),
  duration: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  authorId: z.string(),
});

export type Video = z.infer<typeof VideoSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    clerkUserId: z.boolean().optional(),
    email: z.boolean().optional(),
    userName: z.boolean().optional(),
    profilePicture: z.boolean().optional(),
  })
  .strict();

// VIDEO
//------------------------------------------------------

export const VideoSelectSchema: z.ZodType<Prisma.VideoSelect> = z
  .object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    videoUrl: z.boolean().optional(),
    thumbnailUrl: z.boolean().optional(),
    duration: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    authorId: z.boolean().optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    clerkUserId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    profilePicture: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
  })
  .strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    clerkUserId: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    userName: z.lazy(() => SortOrderSchema).optional(),
    profilePicture: z
      .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
      .optional(),
  })
  .strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z
  .union([
    z.object({
      id: z.string(),
      clerkUserId: z.string(),
      email: z.string(),
    }),
    z.object({
      id: z.string(),
      clerkUserId: z.string(),
    }),
    z.object({
      id: z.string(),
      email: z.string(),
    }),
    z.object({
      id: z.string(),
    }),
    z.object({
      clerkUserId: z.string(),
      email: z.string(),
    }),
    z.object({
      clerkUserId: z.string(),
    }),
    z.object({
      email: z.string(),
    }),
  ])
  .and(
    z
      .object({
        id: z.string().optional(),
        clerkUserId: z.string().optional(),
        email: z.string().optional(),
        AND: z
          .union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => UserWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()])
          .optional(),
        userName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        profilePicture: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
      })
      .strict()
  );

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      clerkUserId: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      userName: z.lazy(() => SortOrderSchema).optional(),
      profilePicture: z
        .union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
        .optional(),
      _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      clerkUserId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      email: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      userName: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      profilePicture: z
        .union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict();

export const VideoWhereInputSchema: z.ZodType<Prisma.VideoWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => VideoWhereInputSchema), z.lazy(() => VideoWhereInputSchema).array()])
      .optional(),
    OR: z
      .lazy(() => VideoWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => VideoWhereInputSchema), z.lazy(() => VideoWhereInputSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    videoUrl: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    thumbnailUrl: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    duration: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
    authorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  })
  .strict();

export const VideoOrderByWithRelationInputSchema: z.ZodType<Prisma.VideoOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      videoUrl: z.lazy(() => SortOrderSchema).optional(),
      thumbnailUrl: z.lazy(() => SortOrderSchema).optional(),
      duration: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      authorId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VideoWhereUniqueInputSchema: z.ZodType<Prisma.VideoWhereUniqueInput> = z
  .object({
    id: z.string(),
  })
  .and(
    z
      .object({
        id: z.string().optional(),
        AND: z
          .union([z.lazy(() => VideoWhereInputSchema), z.lazy(() => VideoWhereInputSchema).array()])
          .optional(),
        OR: z
          .lazy(() => VideoWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([z.lazy(() => VideoWhereInputSchema), z.lazy(() => VideoWhereInputSchema).array()])
          .optional(),
        title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        description: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        videoUrl: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        thumbnailUrl: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
        duration: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
        createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
        updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.date()]).optional(),
        authorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      })
      .strict()
  );

export const VideoOrderByWithAggregationInputSchema: z.ZodType<Prisma.VideoOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      videoUrl: z.lazy(() => SortOrderSchema).optional(),
      thumbnailUrl: z.lazy(() => SortOrderSchema).optional(),
      duration: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      authorId: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => VideoCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => VideoAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => VideoMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => VideoMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => VideoSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const VideoScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VideoScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => VideoScalarWhereWithAggregatesInputSchema),
          z.lazy(() => VideoScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => VideoScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => VideoScalarWhereWithAggregatesInputSchema),
          z.lazy(() => VideoScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      title: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      description: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      videoUrl: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
      thumbnailUrl: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      duration: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
      createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
      updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.date()]).optional(),
      authorId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    })
    .strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    id: z.string().optional(),
    clerkUserId: z.string(),
    email: z.string(),
    userName: z.string(),
    profilePicture: z.string().optional().nullable(),
  })
  .strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    clerkUserId: z.string(),
    email: z.string(),
    userName: z.string(),
    profilePicture: z.string().optional().nullable(),
  })
  .strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    clerkUserId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userName: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    profilePicture: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    clerkUserId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userName: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    profilePicture: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z
  .object({
    id: z.string().optional(),
    clerkUserId: z.string(),
    email: z.string(),
    userName: z.string(),
    profilePicture: z.string().optional().nullable(),
  })
  .strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    clerkUserId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userName: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    profilePicture: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    clerkUserId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userName: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    profilePicture: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const VideoCreateInputSchema: z.ZodType<Prisma.VideoCreateInput> = z
  .object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    videoUrl: z.string(),
    thumbnailUrl: z.string(),
    duration: z.number().int(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    authorId: z.string(),
  })
  .strict();

export const VideoUncheckedCreateInputSchema: z.ZodType<Prisma.VideoUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    videoUrl: z.string(),
    thumbnailUrl: z.string(),
    duration: z.number().int(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    authorId: z.string(),
  })
  .strict();

export const VideoUpdateInputSchema: z.ZodType<Prisma.VideoUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    videoUrl: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    thumbnailUrl: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    duration: z
      .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
      .optional(),
    authorId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  })
  .strict();

export const VideoUncheckedUpdateInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    videoUrl: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    thumbnailUrl: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    duration: z
      .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
      .optional(),
    authorId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  })
  .strict();

export const VideoCreateManyInputSchema: z.ZodType<Prisma.VideoCreateManyInput> = z
  .object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    videoUrl: z.string(),
    thumbnailUrl: z.string(),
    duration: z.number().int(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    authorId: z.string(),
  })
  .strict();

export const VideoUpdateManyMutationInputSchema: z.ZodType<Prisma.VideoUpdateManyMutationInput> = z
  .object({
    id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    videoUrl: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    thumbnailUrl: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    duration: z
      .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
      .optional(),
    authorId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  })
  .strict();

export const VideoUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VideoUncheckedUpdateManyInput> =
  z
    .object({
      id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
      description: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
        .optional(),
      videoUrl: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
        .optional(),
      thumbnailUrl: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
        .optional(),
      duration: z
        .union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
        .optional(),
      createdAt: z
        .union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
        .optional(),
      updatedAt: z
        .union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
        .optional(),
      authorId: z
        .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
        .optional(),
    })
    .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
  })
  .strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      clerkUserId: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      userName: z.lazy(() => SortOrderSchema).optional(),
      profilePicture: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    clerkUserId: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    userName: z.lazy(() => SortOrderSchema).optional(),
    profilePicture: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    clerkUserId: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    userName: z.lazy(() => SortOrderSchema).optional(),
    profilePicture: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
  })
  .strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.date().optional(),
    in: z.date().array().optional(),
    notIn: z.date().array().optional(),
    lt: z.date().optional(),
    lte: z.date().optional(),
    gt: z.date().optional(),
    gte: z.date().optional(),
    not: z.union([z.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
  })
  .strict();

export const VideoCountOrderByAggregateInputSchema: z.ZodType<Prisma.VideoCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      videoUrl: z.lazy(() => SortOrderSchema).optional(),
      thumbnailUrl: z.lazy(() => SortOrderSchema).optional(),
      duration: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      authorId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VideoAvgOrderByAggregateInputSchema: z.ZodType<Prisma.VideoAvgOrderByAggregateInput> =
  z
    .object({
      duration: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VideoMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VideoMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      videoUrl: z.lazy(() => SortOrderSchema).optional(),
      thumbnailUrl: z.lazy(() => SortOrderSchema).optional(),
      duration: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      authorId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VideoMinOrderByAggregateInputSchema: z.ZodType<Prisma.VideoMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      videoUrl: z.lazy(() => SortOrderSchema).optional(),
      thumbnailUrl: z.lazy(() => SortOrderSchema).optional(),
      duration: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      authorId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VideoSumOrderByAggregateInputSchema: z.ZodType<Prisma.VideoSumOrderByAggregateInput> =
  z
    .object({
      duration: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedIntFilterSchema).optional(),
  })
  .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z
  .object({
    equals: z.date().optional(),
    in: z.date().array().optional(),
    notIn: z.date().array().optional(),
    lt: z.date().optional(),
    lte: z.date().optional(),
    gt: z.date().optional(),
    gte: z.date().optional(),
    not: z.union([z.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  })
  .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.date().optional(),
    })
    .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
  })
  .strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z
  .object({
    equals: z.date().optional(),
    in: z.date().array().optional(),
    notIn: z.date().array().optional(),
    lt: z.date().optional(),
    lte: z.date().optional(),
    gt: z.date().optional(),
    gte: z.date().optional(),
    not: z.union([z.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
  })
  .strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
  })
  .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.date().optional(),
      in: z.date().array().optional(),
      notIn: z.date().array().optional(),
      lt: z.date().optional(),
      lte: z.date().optional(),
      gt: z.date().optional(),
      gte: z.date().optional(),
      not: z.union([z.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema])
      .optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const VideoFindFirstArgsSchema: z.ZodType<Prisma.VideoFindFirstArgs> = z
  .object({
    select: VideoSelectSchema.optional(),
    where: VideoWhereInputSchema.optional(),
    orderBy: z
      .union([VideoOrderByWithRelationInputSchema.array(), VideoOrderByWithRelationInputSchema])
      .optional(),
    cursor: VideoWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([VideoScalarFieldEnumSchema, VideoScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const VideoFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VideoFindFirstOrThrowArgs> = z
  .object({
    select: VideoSelectSchema.optional(),
    where: VideoWhereInputSchema.optional(),
    orderBy: z
      .union([VideoOrderByWithRelationInputSchema.array(), VideoOrderByWithRelationInputSchema])
      .optional(),
    cursor: VideoWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([VideoScalarFieldEnumSchema, VideoScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const VideoFindManyArgsSchema: z.ZodType<Prisma.VideoFindManyArgs> = z
  .object({
    select: VideoSelectSchema.optional(),
    where: VideoWhereInputSchema.optional(),
    orderBy: z
      .union([VideoOrderByWithRelationInputSchema.array(), VideoOrderByWithRelationInputSchema])
      .optional(),
    cursor: VideoWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([VideoScalarFieldEnumSchema, VideoScalarFieldEnumSchema.array()]).optional(),
  })
  .strict();

export const VideoAggregateArgsSchema: z.ZodType<Prisma.VideoAggregateArgs> = z
  .object({
    where: VideoWhereInputSchema.optional(),
    orderBy: z
      .union([VideoOrderByWithRelationInputSchema.array(), VideoOrderByWithRelationInputSchema])
      .optional(),
    cursor: VideoWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const VideoGroupByArgsSchema: z.ZodType<Prisma.VideoGroupByArgs> = z
  .object({
    where: VideoWhereInputSchema.optional(),
    orderBy: z
      .union([
        VideoOrderByWithAggregationInputSchema.array(),
        VideoOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: VideoScalarFieldEnumSchema.array(),
    having: VideoScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const VideoFindUniqueArgsSchema: z.ZodType<Prisma.VideoFindUniqueArgs> = z
  .object({
    select: VideoSelectSchema.optional(),
    where: VideoWhereUniqueInputSchema,
  })
  .strict();

export const VideoFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VideoFindUniqueOrThrowArgs> = z
  .object({
    select: VideoSelectSchema.optional(),
    where: VideoWhereUniqueInputSchema,
  })
  .strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  })
  .strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([UserCreateManyInputSchema, UserCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema]),
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const VideoCreateArgsSchema: z.ZodType<Prisma.VideoCreateArgs> = z
  .object({
    select: VideoSelectSchema.optional(),
    data: z.union([VideoCreateInputSchema, VideoUncheckedCreateInputSchema]),
  })
  .strict();

export const VideoUpsertArgsSchema: z.ZodType<Prisma.VideoUpsertArgs> = z
  .object({
    select: VideoSelectSchema.optional(),
    where: VideoWhereUniqueInputSchema,
    create: z.union([VideoCreateInputSchema, VideoUncheckedCreateInputSchema]),
    update: z.union([VideoUpdateInputSchema, VideoUncheckedUpdateInputSchema]),
  })
  .strict();

export const VideoCreateManyArgsSchema: z.ZodType<Prisma.VideoCreateManyArgs> = z
  .object({
    data: z.union([VideoCreateManyInputSchema, VideoCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const VideoDeleteArgsSchema: z.ZodType<Prisma.VideoDeleteArgs> = z
  .object({
    select: VideoSelectSchema.optional(),
    where: VideoWhereUniqueInputSchema,
  })
  .strict();

export const VideoUpdateArgsSchema: z.ZodType<Prisma.VideoUpdateArgs> = z
  .object({
    select: VideoSelectSchema.optional(),
    data: z.union([VideoUpdateInputSchema, VideoUncheckedUpdateInputSchema]),
    where: VideoWhereUniqueInputSchema,
  })
  .strict();

export const VideoUpdateManyArgsSchema: z.ZodType<Prisma.VideoUpdateManyArgs> = z
  .object({
    data: z.union([VideoUpdateManyMutationInputSchema, VideoUncheckedUpdateManyInputSchema]),
    where: VideoWhereInputSchema.optional(),
  })
  .strict();

export const VideoDeleteManyArgsSchema: z.ZodType<Prisma.VideoDeleteManyArgs> = z
  .object({
    where: VideoWhereInputSchema.optional(),
  })
  .strict();
