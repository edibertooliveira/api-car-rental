import { inject, injectable } from 'tsyringe';

import ApiError from '../../../shared/errors/ApiError';
import { ICarsRepository } from '../domain/repositories/ICarsRepository';
import { ICreateCar } from '../domain/models/ICreateCar';
import { ICar } from '../domain/models/ICar';

@injectable()
export default class CreateCarService {
  constructor(@inject('car') private carsRepository: ICarsRepository) {}
  public async execute({
    name,
    brand,
    description,
    daily_rate,
    available,
    license_plate,
  }: ICreateCar): Promise<ICar> {
    const carExists = await this.carsRepository.findByName(name);
    if (carExists) {
      throw new ApiError('There is already one car with this name', 409);
    }

    return this.carsRepository.create({
      name,
      brand,
      description,
      daily_rate,
      available,
      license_plate,
    });
  }
}
