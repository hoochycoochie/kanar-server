import { getRepository } from 'typeorm';
import Category from '../entities/category.entity';
import { ILike } from '../customs/Ilike';

class CategoryService {
  private categoryRepository = getRepository(Category);
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

      const [data, total] = await this.categoryRepository.findAndCount({
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
  public async findById(id: string) {
    try {
      console.log('id', id);
      const cat = await this.categoryRepository.findOne({ where: { id } });

      return cat;
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryService;
