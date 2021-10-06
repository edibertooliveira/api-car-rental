import { getRepository, Repository } from 'typeorm';

import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import Category from '../entities/Category';
import { ICreateCategory } from '@modules/categories/dtos/ICreateCategory';

export default class CategoriesRepository implements ICategoriesRepository {
  private entityRepository: Repository<Category>;
  constructor() {
    this.entityRepository = getRepository(Category);
  }
  public async findByName(name: string): Promise<Category> {
    return this.entityRepository.findOne({
      where: {
        name,
      },
    });
  }
  public async create({
    name,
    description,
  }: ICreateCategory): Promise<Category> {
    const category = this.entityRepository.create({
      name,
      description,
    });

    return this.entityRepository.save(category);
  }
}
