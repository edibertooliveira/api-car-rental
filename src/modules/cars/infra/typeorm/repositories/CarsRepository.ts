import { getRepository, Repository } from 'typeorm';

import Car from '../entities/Car';
import { ICarsRepository } from '../../../repositories/ICarsRepository';
import { ICreateCar } from '@modules/cars/dtos/ICreateCar';

export default class CarsRepository implements ICarsRepository {
  private entityRepository: Repository<Car>;
  constructor() {
    this.entityRepository = getRepository(Car);
  }
  public async delete(id: string): Promise<void> {
    this.entityRepository.delete(id);
  }

  public async findAll(): Promise<Car[]> {
    return this.entityRepository.find();
  }
  public async findByName(name: string): Promise<Car> {
    return this.entityRepository.findOne({
      where: {
        name,
      },
    });
  }
  public async findById(id: string): Promise<Car> {
    return this.entityRepository.findOne(id);
  }
  public async create({
    name,
    brand,
    description,
    daily_rate,
    available,
    license_plate,
  }: ICreateCar): Promise<Car> {
    const car = this.entityRepository.create({
      name,
      brand,
      description,
      daily_rate,
      available,
      license_plate,
    });

    return this.entityRepository.save(car);
  }
  public async save(car: Car): Promise<Car> {
    return this.entityRepository.save(car);
  }
}
