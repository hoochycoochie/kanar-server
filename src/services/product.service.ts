import { getRepository } from 'typeorm';

import Product from '../entities/product.entity';

class ProductService {
  private productRepository = getRepository(Product);

  public async find() {
    try {
      const products = await this.productRepository.find();

      return products;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
