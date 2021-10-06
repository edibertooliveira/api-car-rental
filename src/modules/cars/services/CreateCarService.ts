import { inject, injectable } from 'tsyringe';

import ApiError from '../../../shared/errors/ApiError';
import { ICarsRepository } from '../repositories/ICarsRepository';
import { ICreateCar } from '../dtos/ICreateCar';
import Car from '../infra/typeorm/entities/Car';

@injectable()
export default class CreateCarService {
  constructor(@inject('car') private carsRepository: ICarsRepository) {}
  public async execute({
    name,
    brand,
    description,
    daily_rate,
    available,
    category_id,
    license_plate,
  }: ICreateCar): Promise<Car> {
    const carExists = await this.carsRepository.findByName(name);
    if (carExists) {
      throw new ApiError('Nome do carro já utilizado', 409);
    }

    return this.carsRepository.create({
      name,
      brand,
      description,
      daily_rate,
      available,
      category_id,
      license_plate,
    });
  }
}
