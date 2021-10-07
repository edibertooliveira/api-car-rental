import { ICreateCategory } from '../dtos/ICreateCategory';
import Category from '../infra/typeorm/entities/Category';

export interface ICategoriesRepository {
  create(data: ICreateCategory): Promise<Category>;
  findByName(name: string): Promise<Category | undefined>;
  findById(id: string): Promise<Category | undefined>;
}
