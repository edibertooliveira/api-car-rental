import ApiError from '@shared/errors/ApiError';
import { inject, injectable } from 'tsyringe';

import { ICategory } from '../dtos/ICategory';
import { ICreateCategory } from '../dtos/ICreateCategory';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

@injectable()
export default class CreateCategoryService {
  constructor(
    @inject('category') private categoriesRepository: ICategoriesRepository,
  ) {}
  public async execute({ name }: ICreateCategory): Promise<ICategory> {
    const nameExists = await this.categoriesRepository.findByName(name);
    if (nameExists) {
      throw new ApiError('Nome da categoria já existe', 409);
    }
    return this.categoriesRepository.create({
      name,
    });
  }
}
