import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import User from '../entities/member.entity';
import user_token from '../utils/user_token';

async function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await user_token(token);
    next();
  } catch (error) {
    next(error);
  }
}

export default authMiddleware;
