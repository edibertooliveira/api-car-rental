import { inject, injectable } from 'tsyringe';

import ApiError from '../../../shared/errors/ApiError';
import { ICarsRepository } from '../repositories/ICarsRepository';
import { ICar } from '../dtos/ICar';
import { ICreateCar } from '../dtos/ICreateCar';

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
      throw new ApiError('Nome do carro já utilizado', 409);
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
