import { ICreateCategory } from '@modules/categories/dtos/ICreateCategory';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';
import { v4 as uuidv4 } from 'uuid';

export default class CategoriesRepositoryInMemory
  implements ICategoriesRepository
{
  private categories: Category[] = [];

  async findById(id: string): Promise<Category | undefined> {
    return this.categories.find(category => category.id === id);
  }

  async findByName(name: string): Promise<Category | undefined> {
    return this.categories.find(category => category.name === name);
  }

  async create({ name, description }: ICreateCategory): Promise<Category> {
    const category = new Category();
    Object.assign(category, {
      id: uuidv4(),
      name,
      description,
      created_at: new Date(),
    });
    this.categories.push(category);
    return category;
  }
}
