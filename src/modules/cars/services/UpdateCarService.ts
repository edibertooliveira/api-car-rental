import { inject, injectable } from 'tsyringe';

import ApiError from '../../../shared/errors/ApiError';
import { ICarsRepository } from '../repositories/ICarsRepository';
import { IUpdateCar } from '../dtos/IUpdateCar';
import Car from '../infra/typeorm/entities/Car';
import { StatusCodes } from 'http-status-codes';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';

@injectable()
export default class UpdateCarService {
  constructor(
    @inject('car') private carsRepository: ICarsRepository,
    @inject('category') private categoriesRepository: ICategoriesRepository,
  ) {}
  public async execute({
    id,
    name,
    brand,
    description,
    dailyRate,
    available,
    categoryId,
    licensePlate,
  }: IUpdateCar): Promise<Car> {
    const carExists = await this.carsRepository.findById(id);
    if (!carExists) {
      throw new ApiError('Car not found', StatusCodes.NOT_FOUND);
    }

    const carNameExists = await this.carsRepository.findByName(name);

    if (carNameExists && carNameExists.id !== id) {
      throw new ApiError('Name of car already used', StatusCodes.CONFLICT);
    }

    if (categoryId) {
      const categoryExists = await this.categoriesRepository.findById(
        categoryId,
      );
      if (!categoryExists) {
        throw new ApiError('Category not found', StatusCodes.NOT_FOUND);
      }
      carExists.categoryId = categoryId;
    }

    if (name) carExists.name = name;
    if (brand) carExists.brand = brand;
    if (description) carExists.description = description;
    if (dailyRate) carExists.dailyRate = dailyRate;
    if (licensePlate) carExists.licensePlate = licensePlate;

    carExists.available = available;
    await this.carsRepository.save(carExists);
    return carExists;
  }
}
