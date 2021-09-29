import { inject, injectable } from 'tsyringe';
import { ICar } from '../domain/models/ICar';
import { IFindByCarId } from '../domain/models/IFindByCarId';
import { ICarsRepository } from '../domain/repositories/ICarsRepository';
import ApiError from '@shared/errors/ApiError';

@injectable()
export default class ShowCarService {
  constructor(@inject('car') private carsRepository: ICarsRepository) {}
  public async execute({ id }: IFindByCarId): Promise<ICar> {
    const carExists = await this.carsRepository.findById(id);
    if (!carExists) throw new ApiError('Carro não encontrado', 404);
    return this.carsRepository.findById(id);
  }
}
