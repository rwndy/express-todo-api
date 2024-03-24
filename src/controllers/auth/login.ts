import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../data-source'; // Adjust the import path as needed
import { User } from '../../orm/entities/User'; // Adjust the import path as needed
import { JwtPayload } from '../../types/JwtPayload'; // Adjust the import path as needed
import { createJwtToken } from '../../utils/createJwToken'; // Adjust the import path as needed
import { CustomError } from '../../utils/response/custom-error/CustomError'; // Adjust the import path as needed

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { EMAIL, PASSWORD } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  try {
    const user = await userRepository.findOneBy({ EMAIL });

    if (!user) {
      const customError = new CustomError(404, 'General', 'Not Found', ['Incorrect email or password']);
      return next(customError);
    }

    if (!user.checkIfPasswordMatch(PASSWORD)) {
      const customError = new CustomError(404, 'General', 'Not Found', ['Incorrect email or password']);
      return next(customError);
    }

    const jwtPayload: JwtPayload = {
      user_id: user.USER_ID,
      name: user.NAME,
      email: user.EMAIL,
    };

    try {
      const token = createJwtToken(jwtPayload);
      res.customSuccess(200, 'Token successfully created.', `Bearer ${token}`);
    } catch (err) {
      const customError = new CustomError(400, 'Raw', "Token can't be created", null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
