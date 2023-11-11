import { Request } from 'express';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../utils/data-source';

const postRepository = AppDataSource.getRepository(Post);

export const createPost = async (input: Partial<Post>, owner: User) => {
  return await postRepository.save(postRepository.create({ ...input, owner }));
};

export const getPost = async (postId: number) => {
  return await postRepository.findOneBy({ id: postId });
};

export const findPosts = async (req: Request) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const builder = postRepository.createQueryBuilder('post');

  if (req.query.search) {
    builder.where('post.title LIKE :search', {
      search: `%${req.query.search}%`,
    });
  }

  const [result, total] = await builder
      .take(limit)
      .skip((page - 1) * limit)
      .orderBy('post.created_at', 'DESC').getManyAndCount();
  return [result, total]
};
