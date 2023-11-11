import {date, object, string, TypeOf} from 'zod';

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: 'Username is required',
    }),
    name: string({
      required_error: 'Name is required',
    }),
    dob: date({
      required_error: 'Date of birth is required',
      invalid_type_error: "created at must be a date",
    }),
    created_at: date({
      required_error: 'created at is required',
      invalid_type_error: "created at must be a date",
    }),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
  }),
});

const params = {
  params: object({
    userId: string(),
  }),
};

export const getUserSchema = object({
  ...params,
});

export const updateUserSchema = object({
  ...params,
  body: object({
    username: string(),
    name: string(),
    dob: date({
      invalid_type_error: "created at must be a date",
    }),
    created_at: date({
      invalid_type_error: "created at must be a date",
    }),
    password: string(),
  }).partial(),
});

export const deleteUserSchema = object({
  ...params,
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type GetUserInput = TypeOf<typeof getUserSchema>['params'];
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>['params'];