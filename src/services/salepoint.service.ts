import { getRepository } from 'typeorm';
import SalePoint from '../entities/sale_point.entity';
import { ILike } from '../customs/Ilike';

class SalePointService {
  private salePointRepository = getRepository(SalePoint);

  public async find(query: any) {
    try {
      const { company_id, name } = query;

      if (!company_id) {
        throw new Error('company unknown');
      }

      const take = query.take || 5;
      const skip = query.skip || 0;

      let where = {};
      let order = {};

      if (name) {
        order = { name: 'DESC' };
        name.toLowerCase();
        where = {
          name: ILike('%' + name + '%'),
          company_id,
        };

        order = { name: 'DESC' };
      } else {
        order = { created_at: 'DESC' };
      }

      const [data, total] = await this.salePointRepository.findAndCount({
        where,
        order,
        take: parseInt(take),
        skip: parseInt(skip),
      });

      return {
        data,
        total,
        skip,
        take,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default SalePointService;
