import { ICategory } from '@modules/categories/dtos/ICategory';
import { ICreateCategory } from '@modules/categories/dtos/ICreateCategory';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

export default class CategoriesRepositoryInMemory
  implements ICategoriesRepository
{
  private categories: Category[] = [];
  private countId: number;

  async findByName(name: string): Promise<ICategory | undefined> {
    return this.categories.find(category => category.name === name);
  }

  async create({ name }: ICreateCategory): Promise<ICategory> {
    this.countId += 1;
    const category = {
      id: this.countId,
      name,
      created_at: new Date(),
    };
    this.categories.push(category);
    return category;
  }
}
