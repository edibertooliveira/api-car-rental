import { ICategory } from '../dtos/ICategory';
import { ICreateCategory } from '../dtos/ICreateCategory';

export interface ICategoriesRepository {
  create(data: ICreateCategory): Promise<ICategory>;
  findByName(name: string): Promise<ICategory | undefined>;
}
