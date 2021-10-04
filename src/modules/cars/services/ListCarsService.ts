import { inject, injectable } from 'tsyringe';
import { ICar } from '../dto/ICar';
import { ICarsRepository } from '../repositories/ICarsRepository';

@injectable()
export default class ListCarsService {
  constructor(@inject('car') private carsRepository: ICarsRepository) {}
  public async execute(): Promise<ICar[]> {
    return this.carsRepository.findAll();
  }
}
