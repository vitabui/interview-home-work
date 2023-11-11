import {date, number, object, string, TypeOf} from 'zod';

export const createCommentSchema = object({
  body: object({
    content: string({
      required_error: 'Content is required',
    }),
    postId: number({
      required_error: 'Post ID is required',
    }),
    ownerId: number({
      required_error: 'Owner ID is required',
    }),
    created_at: date({
      required_error: 'created at is required',
      invalid_type_error: "created at must be a date",
    }),
  }),
});

const params = {
  params: object({
    commentId: string(),
  }),
};

export const getCommentSchema = object({
  ...params,
});

export const getCommentsSchema = object({
  params: object({
    postId: string(),
  }),
});

export const updateCommentSchema = object({
  ...params,
  body: object({
    content: string(),
    created_at: date()
  }).partial(),
});

export const deleteCommentSchema = object({
  ...params,
});

export type CreateCommentInput = TypeOf<typeof createCommentSchema>['body'];
export type GetCommentInput = TypeOf<typeof getCommentSchema>['params'];
export type GetCommentsInput = TypeOf<typeof getCommentsSchema>['params'];
export type UpdateCommentInput = TypeOf<typeof updateCommentSchema>;
export type DeleteCommentInput = TypeOf<typeof deleteCommentSchema>['params'];
