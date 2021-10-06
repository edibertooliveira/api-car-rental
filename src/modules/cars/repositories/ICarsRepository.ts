import { ICreateCar } from '../dtos/ICreateCar';
import Car from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  findByName(name: string): Promise<Car | undefined>;
  findById(id: string): Promise<Car | undefined>;
  findAll(): Promise<Car[]>;
  create(data: ICreateCar): Promise<Car>;
  delete(id: string): Promise<void>;
  save(car: Car): Promise<Car>;
}
