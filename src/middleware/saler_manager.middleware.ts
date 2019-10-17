import { NextFunction, Response } from 'express';
import { getRepository } from 'typeorm';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import user_token from '../utils/user_token';
import MemberRole from '../entities/member_role.entity';
import { SALER_MANAGER, SALER } from '../utils/constants';

async function saler_manager(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      next(new WrongAuthenticationTokenException());
    }

    const member_id = await user_token(token);
    const company_id = req.body.company_id;
    if (!company_id) {
      throw new Error('unknown company');
    }
    const memberRoleRepository = getRepository(MemberRole);

    const roles = await memberRoleRepository
      .createQueryBuilder('role')
      .where(
        'role.member_id = :member_id and  role.company_id=:company_id and (role.name=:saler or role.name=:salerManager)',
        {
          member_id,
          company_id,
          salerManager: SALER_MANAGER,
          saler: SALER,
        }
      )
      .getCount();

    if (roles < 1) {
      throw new Error('missing authorization');
    }

    next();
  } catch (error) {
    next(error);
  }
}

export default saler_manager;
