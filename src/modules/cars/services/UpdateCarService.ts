import { inject, injectable } from 'tsyringe';

import ApiError from '../../../shared/errors/ApiError';
import { ICarsRepository } from '../repositories/ICarsRepository';
import { IUpdateCar } from '../dtos/IUpdateCar';
import Car from '../infra/typeorm/entities/Car';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class UpdateCarService {
  constructor(@inject('car') private carsRepository: ICarsRepository) {}
  public async execute({
    id,
    name,
    brand,
    description,
    daily_rate,
    available,
    license_plate,
  }: IUpdateCar): Promise<Car> {
    const carExists = await this.carsRepository.findById(id);
    if (!carExists) throw new ApiError('Car not found', StatusCodes.NOT_FOUND);
    const carNameExists = await this.carsRepository.findByName(name);
    if (carNameExists && carNameExists.id !== id)
      throw new ApiError('Name of car already used', StatusCodes.CONFLICT);

    if (name) carExists.name = name;
    if (brand) carExists.brand = brand;
    if (description) carExists.description = description;
    if (daily_rate) carExists.daily_rate = daily_rate;
    if (license_plate) carExists.license_plate = license_plate;

    carExists.available = available;
    await this.carsRepository.save(carExists);
    return carExists;
  }
}
