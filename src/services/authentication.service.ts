import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import User from '../entities/member.entity';
import LogInDto from '../dtos/logIn.dto';
import Company from '../entities/company.entity';
import MemberRole from '../entities/member_role.entity';
import Member from '../entities/member.entity';
import FieldErrorException from '../exceptions/FieldErrorException';
import MemberSalePoint from '../entities/member_salepoint.entity';

class AuthenticationService {
  private userRepository = getRepository(User);
  private companyRepository = getRepository(Company);
  private memberRoleRepository = getRepository(MemberRole);
  private memberSalePointRepository = getRepository(MemberSalePoint);

  public async tokenize(id) {
    try {
      const dataStoredInToken: DataStoredInToken = {
        id,
      };
      const token = await jwt.sign(dataStoredInToken, process.env.JWT_SECRET);
      return { token };
    } catch (error) {
      throw error;
    }
  }
  public async login(credentials: LogInDto) {
    try {
      const { reference, password, identifiant } = credentials;
      const company: Company = await this.companyRepository.findOne({
        where: { reference },
      });
      if (!company) {
        throw new FieldErrorException(404, 'unknown_company', 'reference');
      }
      const user: Member = await this.userRepository
        .createQueryBuilder()
        .where('email = :identifiant OR phone = :identifiant', {
          identifiant,
        })
        .addSelect('Member.password')
        .getOne();

      if (!user) {
        throw new FieldErrorException(403, 'wrong_identifiant', 'identifiant');
      }
      const isPasswordValid: boolean = await user.checkIfUnencryptedPasswordIsValid(
        password
      );

      if (!isPasswordValid) {
        throw new FieldErrorException(403, 'password_wrong', 'password');
      }

      const memberRoles: MemberRole[] = await this.memberRoleRepository
        .createQueryBuilder()
        .where(
          'MemberRole.memberId = :memberId AND  MemberRole.companyId = :companyId',
          {
            memberId: user.id,
            companyId: company.id,
          }
        )
        .getMany();
      const salepoints: MemberSalePoint[] = await this.memberSalePointRepository
        .createQueryBuilder()
        .where(
          'MemberSalePoint.memberId = :memberId AND  MemberSalePoint.companyId = :companyId',
          {
            memberId: user.id,
            companyId: company.id,
          }
        )
        .getMany();

      const { token } = await this.tokenize(user.id);
      return {
        token,
        roles: memberRoles,
        company: company,
        salepoints,
        user: { ...user, password: null },
      };
    } catch (error) {
      throw error;
    }
  }
}

export default AuthenticationService;
