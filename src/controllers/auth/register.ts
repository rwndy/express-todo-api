import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from 'data-source';

import { User } from '../../orm/entities/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { EMAIL, PASSWORD, NAME } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { EMAIL } });

    if (user) {
      const customError = new CustomError(400, 'General', 'User already exists', [
        `Email '${user.EMAIL}' already exists`,
      ]);
      return next(customError);
    }

    try {
      const newUser = new User();
      newUser.EMAIL = EMAIL;
      newUser.PASSWORD = PASSWORD;
      newUser.NAME = NAME;
      newUser.hashPassword();
      await userRepository.save(newUser);

      res.customSuccess(200, 'User successfully created.');
    } catch (err) {
      const customError = new CustomError(400, 'Raw', `User '${EMAIL}' can't be created`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};