import { Request } from 'express';
import { Post } from '../entities/post.entity';
import { Comment } from '../entities/comment.entity';
import { AppDataSource } from '../utils/data-source';
import {User} from "../entities/user.entity";

const commentRepository = AppDataSource.getRepository(Comment);

export const createComment = async (input: Partial<Comment>, post: Post, owner: User) => {
  return await commentRepository.save(commentRepository.create({ ...input, post, owner }));
};

export const getComment = async (commentId: number) => {
  return await commentRepository.findOneBy({ id: commentId });
};

export const findComments = async (req: Request) => {
  const qb = commentRepository.createQueryBuilder('comment').where({});
  console.log(req.query.postId);
  if (req.query.postId) {
    qb.andWhere(`comment.post.id = :postId`, {
      postId: +req.query.postId,
    }).leftJoinAndSelect('comment.post', 'post');
  }

  return await qb.getMany();
};
