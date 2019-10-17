import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import User from '../entities/member.entity';

async function user_token(token) {
  try {
    if (!token) {
      new Error('token not provided');
    }

    const verificationResponse = (await jwt.verify(
      token,
      process.env.JWT_SECRET
    )) as DataStoredInToken;

    if (!verificationResponse) {
      throw new Error('unknown user');
    }
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { id: verificationResponse.id, is_active: true },
    });

    if (!user) {
      throw new Error('unknown user');
    }

    return user.id;
  } catch (error) {
    throw error;
  }
}

export default user_token;
