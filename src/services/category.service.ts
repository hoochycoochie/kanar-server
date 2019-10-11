import { getRepository } from 'typeorm';

import Cateory from '../entities/category.entity';

class CategoryService {
  private categoryRepository = getRepository(Cateory);

  public async find() {
    try {
      const categories = await this.categoryRepository.find({
        relations: ['author'],
      });

      return categories;
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
