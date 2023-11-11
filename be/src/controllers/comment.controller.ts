import { NextFunction, Request, Response } from 'express';
import { createComment, findComments, getComment } from '../services/comment.service';
import { getPost } from '../services/post.service';
import AppError from '../utils/appError';
import {
  CreateCommentInput,
  DeleteCommentInput,
  UpdateCommentInput,
  GetCommentInput,
  GetCommentsInput
} from "../schemas/comment.schema";
import {getUser} from "../services/user.service";

export const createCommentHandler = async (
  req: Request<{}, {}, CreateCommentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await getPost(req.body.postId);
    const owner = await getUser(req.body.ownerId);

    const comment = await createComment(req.body, post!, owner!);

    res.status(201).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Comment with that title already exist',
      });
    }
    next(err);
  }
};

export const getCommentHandler = async (
  req: Request<GetCommentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await getPost(+req.params.commentId);

    if (!comment) {
      return next(new AppError(404, 'Post with that ID not found'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getCommentsHandler = async (
  req: Request<GetCommentsInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await findComments(req);

    res.status(200).json({
      status: 'success',
      results: comments.length,
      data: {
        comments,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateCommentHandler = async (
  req: Request<UpdateCommentInput['params'], {}, UpdateCommentInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await getComment(+req.params.commentId);

    if (!comment) {
      return next(new AppError(404, 'Comment with that ID not found'));
    }

    Object.assign(comment, req.body);

    const updatedComment = await comment.save();

    res.status(200).json({
      status: 'success',
      data: {
        post: updatedComment,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteCommentHandler = async (
  req: Request<DeleteCommentInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await getPost(+req.params.commentId);

    if (!comment) {
      return next(new AppError(404, 'Comment with that ID not found'));
    }

    await comment.remove();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
