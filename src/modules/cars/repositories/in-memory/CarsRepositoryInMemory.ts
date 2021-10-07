import { ICreateCar } from '@modules/cars/dtos/ICreateCar';
import Car from '@modules/cars/infra/typeorm/entities/Car';
import { v4 as uuidv4 } from 'uuid';
import { ICarsRepository } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async delete(id: string): Promise<void> {
    this.cars = this.cars.filter(car => car.id !== id);
  }

  async findAll(): Promise<Car[]> {
    return this.cars;
  }

  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find(car => car.id === id);
  }

  async findByName(name: string): Promise<Car | undefined> {
    return this.cars.find(car => car.name === name);
  }

  async create({
    available,
    brand,
    category_id,
    daily_rate,
    description,
    license_plate,
    name,
  }: ICreateCar): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      available,
      brand,
      category_id,
      daily_rate,
      description,
      license_plate,
      name,
      created_at: new Date(),
      id: uuidv4(),
    });
    this.cars.push(car);
    return car;
  }

  async save(car: Car): Promise<Car> {
    const currentCar = this.cars.findIndex(({ id }) => id === car.id);
    this.cars[currentCar] = car;
    return car;
  }
}
