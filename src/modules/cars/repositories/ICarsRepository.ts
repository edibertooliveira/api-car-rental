import { ICar } from '../dto/ICar';
import { ICreateCar } from '../dto/ICreateCar';

export interface ICarsRepository {
  findByName(name: string): Promise<ICar | undefined>;
  findById(id: string): Promise<ICar | undefined>;
  findAll(): Promise<ICar[]>;
  create(data: ICreateCar): Promise<ICar>;
  delete(id: string): Promise<void>;
  save(car: ICar): Promise<ICar>;
}
