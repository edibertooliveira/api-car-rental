import { v4 as uuidv4 } from 'uuid';
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository';
import { ICar } from '../../modules/cars/dtos/ICar';
import Car from '../../modules/cars/infra/typeorm/entities/Car';
import { ICreateCar } from '@modules/cars/dtos/ICreateCar';

export class CarsRepositoryMake implements ICarsRepository {
  private cars: Car[] = [];

  async delete(id: string): Promise<void> {
    this.cars = this.cars.filter(car => car.id !== id);
  }

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
