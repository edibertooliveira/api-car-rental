import { inject, injectable } from 'tsyringe';
import { ICar } from '../domain/models/ICar';
import { ICarRepository } from '../domain/repositories/ICarRepository';

@injectable()
export default class ListCarsService {
  constructor(@inject('car') private usersRepository: ICarRepository) {}
  public async execute(): Promise<ICar[]> {
    return await this.usersRepository.findAll();
  }
}
