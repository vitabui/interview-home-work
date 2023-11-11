import { User } from '../entities/user.entity';
import { AppDataSource } from '../utils/data-source';
import {Request} from "express";

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: Partial<User>) => {
  return await userRepository.save(userRepository.create(input));
};

export const getUser = async (ownerId: number) => {
  return await userRepository.findOneBy({ id: ownerId });
};

// export const getUser = async (query: Object) => {
//   return await userRepository.findOneBy(query);
// }

export const getUsers = async (req: Request) => {
  const builder = userRepository.createQueryBuilder('user');
  return await builder.getMany();
};
