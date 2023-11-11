import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import {CreateUserInput, DeleteUserInput, GetUserInput, UpdateUserInput} from "../schemas/user.schema";
import {createUser, getUser, getUsers} from "../services/user.service";

export const createUserHandler = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
) => {
  try {

    const user = await createUser(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'User with username already exist',
      });
    }
    next(err);
  }
};

export const getUserHandler = async (
    req: Request<GetUserInput>,
    res: Response,
    next: NextFunction
) => {
  try {
    const user = await getUser(+req.params.userId);

    if (!user) {
      return next(new AppError(404, 'User with that ID not found'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getUsersHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    const users = await getUsers(req);

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateUserHandler = async (
    req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>,
    res: Response,
    next: NextFunction
) => {
  try {
    const user = await getUser(+req.params.userId);

    if (!user) {
      return next(new AppError(404, 'User with that ID not found'));
    }

    Object.assign(user, req.body);

    const updatedUser = await user.save();

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteUserHandler = async (
    req: Request<DeleteUserInput>,
    res: Response,
    next: NextFunction
) => {
  try {
    const user = await getUser(+req.params.userId);

    if (!user) {
      return next(new AppError(404, 'User with that ID not found'));
    }

    await user.remove();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
