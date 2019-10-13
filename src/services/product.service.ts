import { getRepository, Like } from 'typeorm';

import Product from '../entities/product.entity';

class ProductService {
  private productRepository = getRepository(Product);

  public async find() {
    try {
      const products = await this.productRepository.find({
        relations: ['author', 'category', 'salepoints'],
      });

      return products;
    } catch (error) {
      throw error;
    }
  }

  public async findAll(query) {
    try {
      const take = query.take || 10;
      const skip = query.skip || 0;
      const name = query.name;
      let where = {};
      if (name) {
        where = { name: Like('%' + name + '%') };
      }
      console.log('where', where);
      const [result, total] = await this.productRepository.findAndCount({
        where,
        order: { name: 'DESC' },
        take: take,
        skip: skip,
      });

      return {
        data: result,
        count: total,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
