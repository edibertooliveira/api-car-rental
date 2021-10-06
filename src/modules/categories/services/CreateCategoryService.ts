import ApiError from '@shared/errors/ApiError';
import { inject, injectable } from 'tsyringe';

import { ICreateCategory } from '../dtos/ICreateCategory';
import Category from '../infra/typeorm/entities/Category';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class CreateCategoryService {
  constructor(
    @inject('category') private categoriesRepository: ICategoriesRepository,
  ) {}
  public async execute({
    name,
    description,
  }: ICreateCategory): Promise<Category> {
    const nameExists = await this.categoriesRepository.findByName(name);
    if (nameExists) {
      throw new ApiError('Name of car already used', StatusCodes.CONFLICT);
    }
    return this.categoriesRepository.create({
      name,
      description,
    });
  }
}
