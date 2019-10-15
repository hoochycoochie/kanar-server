import { getRepository } from 'typeorm';

class BaseService {
  private entityRepository: any;
  private entity: any;
  constructor(entity: any) {
    this.entity = entity;
    this.entityRepository = getRepository(entity);
  }

  public async save(data: any) {
    try {
      const created = await this.entityRepository.create({ ...data });

      await created.save();
      return created;
    } catch (error) {
      throw error;
    }
  }

  public async findOne(id: any) {
    try {
      const one = await this.entityRepository
        .createQueryBuilder()
        .where('id = :id', {
          id,
        })

        .getOne();
      if (!one) {
        throw new Error('not found');
      }
      return one;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: any) {
    try {
      const remove = this.entityRepository
        .createQueryBuilder()
        .delete()
        .from(this.entity)
        .where('id = :id', { id })
        .execute();

      return remove;
    } catch (error) {
      throw error;
    }
  }
  public async update(id: any, data) {
    try {
      const update = await this.entityRepository
        .update(this.entity)
        .set({ ...data })
        .where('id = :id', { id })
        .execute();

      return update;
    } catch (error) {
      throw error;
    }
  }
  public async find(where?: any) {
    try {
      const data = await this.entityRepository.find({ where });

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default BaseService;
