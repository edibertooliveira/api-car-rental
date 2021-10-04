import { inject, injectable } from 'tsyringe';
import { ICar } from '../dtos/ICar';
import { ICarsRepository } from '../repositories/ICarsRepository';
import ApiError from '@shared/errors/ApiError';
import { IFindByCarId } from '../dtos/IFindByCarId';

@injectable()
export default class ShowCarService {
  constructor(@inject('car') private carsRepository: ICarsRepository) {}
  public async execute({ id }: IFindByCarId): Promise<ICar> {
    const carExists = await this.carsRepository.findById(id);
    if (!carExists) throw new ApiError('Carro não encontrado', 404);
    return this.carsRepository.findById(id);
  }
}
