import { inject, injectable } from 'tsyringe';

import ApiError from '../../../shared/errors/ApiError';
import { ICarsRepository } from '../repositories/ICarsRepository';
import { ICreateCar } from '../dtos/ICreateCar';
import Car from '../infra/typeorm/entities/Car';
import { StatusCodes } from 'http-status-codes';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';

@injectable()
export default class CreateCarService {
  constructor(
    @inject('car') private carsRepository: ICarsRepository,
    @inject('category') private categoriesRepository: ICategoriesRepository,
  ) {}
  public async execute({
    name,
    brand,
    description,
    dailyRate,
    available,
    categoryId,
    licensePlate,
  }: ICreateCar): Promise<Car> {
    const carExists = await this.carsRepository.findByName(name);
    const categoryExists = await this.categoriesRepository.findById(categoryId);
    if (!categoryExists) {
      throw new ApiError('Category not found', StatusCodes.NOT_FOUND);
    }
    if (carExists) {
      throw new ApiError('Name of car already used', StatusCodes.CONFLICT);
    }
    return this.carsRepository.create({
      name,
      brand,
      description,
      dailyRate,
      available,
      categoryId,
      licensePlate,
    });
  }
}
