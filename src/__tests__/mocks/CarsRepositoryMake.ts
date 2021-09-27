import { v4 as uuidv4 } from 'uuid';
import { ICarsRepository } from '../../modules/cars/domain/repositories/ICarsRepository';
import { ICar } from '../../modules/cars/domain/models/ICar';
import { ICreateCar } from '../../modules/cars/domain/models/ICreateCar';
import Car from '../../modules/cars/typeorm/entities/Car';

export class CarsRepositoryMake implements ICarsRepository {
  private cars: Car[] = [];

  async findAll(): Promise<ICar[]> {
    return this.cars;
  }

  async findById(id: string): Promise<ICar | undefined> {
    return this.cars.find(car => car.id === id);
  }

  async findByName(name: string): Promise<ICar | undefined> {
    return this.cars.find(car => car.name === name);
  }

  async create(data: ICreateCar): Promise<ICar> {
    const car = {
      id: uuidv4(),
      ...data,
      created_at: new Date(),
    };
    this.cars.push(car);
    return car;
  }

  async save(car: ICar): Promise<ICar> {
    this.cars.push(car);
    return car;
  }
}
