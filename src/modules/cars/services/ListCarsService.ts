import { inject, injectable } from 'tsyringe';
import Car from '../infra/typeorm/entities/Car';
import { ICarsRepository } from '../repositories/ICarsRepository';

@injectable()
export default class ListCarsService {
  constructor(@inject('car') private carsRepository: ICarsRepository) {}
  public async execute(): Promise<Car[]> {
    return this.carsRepository.findAll();
  }
}
