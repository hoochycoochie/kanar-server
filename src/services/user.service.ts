import { getRepository } from 'typeorm';

import Member from '../entities/member.entity';

class UserService {
  private userRepository = getRepository(Member);

  public async find() {
    try {
      const users = await this.userRepository.find({ relations: ['roles'] });

      return users;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
