import { getRepository } from 'typeorm';
import SalePoint from '../entities/sale_point.entity';

class SalePointService {
  private salePointRepository = getRepository(SalePoint);

  public async find() {
    try {
      const salePoints = await this.salePointRepository.find({
        relations: ['products'],
      });

      return salePoints;
    } catch (error) {
      throw error;
    }
  }
}

export default SalePointService;
