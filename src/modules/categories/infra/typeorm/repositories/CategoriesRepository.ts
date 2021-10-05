import { getRepository, Repository } from 'typeorm';

import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { ICategory } from '@modules/categories/dtos/ICategory';
import Category from '../entities/Category';
import { ICreateCategory } from '@modules/categories/dtos/ICreateCategory';

export default class CategoriesRepository implements ICategoriesRepository {
  private entityRepository: Repository<ICategory>;
  constructor() {
    this.entityRepository = getRepository(Category);
  }
  public async findByName(name: string): Promise<ICategory> {
    return this.entityRepository.findOne({
      where: {
        name,
      },
    });
  }
  public async create({ name }: ICreateCategory): Promise<ICategory> {
    const category = this.entityRepository.create({
      name,
    });

    return this.entityRepository.save(category);
  }
}
