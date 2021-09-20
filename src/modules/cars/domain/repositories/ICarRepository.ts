import { ICar } from "../models/ICar";
import { ICreateCar } from "../models/ICreateCar";

export interface ICarRepository {
  findByName(name:string): Promise<ICar | undefined>
  findById(id:string): Promise<ICar | undefined>
  findAll(): Promise<ICar[]>
  create(data: ICreateCar): ICar
  save(car: ICar): Promise<ICar>
}