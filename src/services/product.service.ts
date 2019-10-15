import { getRepository, In } from 'typeorm';
import Product from '../entities/product.entity';
import { ILike } from '../customs/Ilike';
import ProductSalePoint from '../entities/product_salepoint.entity';
import SalePoint from '../entities/sale_point.entity';

class ProductService {
  private productRepository = getRepository(Product);
  private productSalepointRepository = getRepository(ProductSalePoint);

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

  public async findAll(input) {
    try {
      const { salepointId, companyId, query } = input;
      if (!salepointId) {
        throw new Error('salepoint unknown');
      }
      if (!companyId) {
        throw new Error('company unknown');
      }

      const productSalepoints = await this.productSalepointRepository.find({
        where: { salepoint_id: salepointId },
      });

      const productIds = productSalepoints.map(p => p.product_id);
      if (!productIds.length) {
        throw new Error('no products on salepoint ' + salepointId);
      }
      const take = query.take || 10;
      const skip = query.skip || 0;
      let name = query.name;
      let where = {};
      let order = {};
      console.log('query', query);
      console.log('skip', skip);
      if (name) {
        order = { name: 'DESC' };
        name.toLowerCase();
        where = {
          name: ILike('%' + name + '%'),
          company_id: companyId,
          id: In(productIds),
          is_active: true,
        };

        order = { name: 'DESC' };
      } else {
        order = { created_at: 'DESC' };
      }

      const [data, total] = await this.productRepository.findAndCount({
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

export default ProductService;
