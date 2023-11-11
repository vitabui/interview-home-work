import express from 'express';
import { validate } from '../middleware/validate';
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentSchema,
  updateCommentSchema
} from "../schemas/comment.schema";
import {
  createCommentHandler,
  deleteCommentHandler,
  getCommentHandler,
  getCommentsHandler,
  updateCommentHandler
} from "../controllers/comment.controller";

const router = express.Router();
router
  .route('/')
  .post(validate(createCommentSchema), createCommentHandler)
  .get(getCommentsHandler);

router
  .route('/:commentId')
  .get(validate(getCommentSchema), getCommentHandler)
  .patch(validate(updateCommentSchema), updateCommentHandler)
  .delete(validate(deleteCommentSchema), deleteCommentHandler);

export default router;
