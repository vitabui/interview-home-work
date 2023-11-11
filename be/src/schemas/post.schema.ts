import {date, number, object, string, TypeOf} from 'zod';

export const createPostSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    content: string({
      required_error: 'Content is required',
    }),
    ownerId: number({
      required_error: 'Owner ID is required',
    }),
    tags: string({
      required_error: 'Tags is required',
    }).array(),
    created_at: date({
      required_error: 'created at is required',
      invalid_type_error: "created at must be a date",
    }),
  }),
});

const params = {
  params: object({
    postId: string(),
  }),
};

export const getPostSchema = object({
  ...params,
});

export const getPostsSchema = object({
  params: object({
    page: string(),
    limit: string(),
    search: string()
  }),
});

export const updatePostSchema = object({
  ...params,
  body: object({
    title: string(),
    content: string(),
    tags: string().array(),
    created_at: date({
      invalid_type_error: "created at must be a date",
    }),
  }).partial(),
});

export const deletePostSchema = object({
  ...params,
});

export type CreatePostInput = TypeOf<typeof createPostSchema>['body'];
export type GetPostInput = TypeOf<typeof getPostSchema>['params'];
export type GetPostsInput = TypeOf<typeof getPostsSchema>['params'];
export type UpdatePostInput = TypeOf<typeof updatePostSchema>;
export type DeletePostInput = TypeOf<typeof deletePostSchema>['params'];
