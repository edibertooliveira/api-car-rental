import { getRepository, Repository } from "typeorm";

import Car from '../entities/Car'
import {ICarRepository} from "../../domain/repositories/ICarRepository";
import {ICar} from "../../domain/models/ICar";
import {ICreateCar} from "../../domain/models/ICreateCar";

export default class CarRepository implements ICarRepository {

  private entityRepository: Repository<ICar>
  constructor() {
    this.entityRepository = getRepository(Car)
  }

  public async findAll(): Promise<ICar[]> {
    return this.entityRepository.find();
  }
  public async findByName(name: string): Promise<ICar> {
    return this.entityRepository.findOne({
      where: {
        name,
      },
    })
  }
  public async findById(id: string): Promise<ICar> {
    return this.entityRepository.findOne(id)
  }
  public async create({
    name,
    brand,
    description,
    daily_rate,
    available,
    license_plate,
  }: ICreateCar): Promise<ICar> {
    const car = this.entityRepository.create({
      name,
      brand,
      description,
      daily_rate,
      available,
      license_plate,
    })

    return await this.entityRepository.save(car);
  }
  public async save(car: ICar): Promise<ICar> {
    return await this.entityRepository.save(car);
  }
}