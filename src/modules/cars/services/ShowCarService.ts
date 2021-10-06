import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '../repositories/ICarsRepository';
import ApiError from '@shared/errors/ApiError';
import { IFindByCarId } from '../dtos/IFindByCarId';
import Car from '../infra/typeorm/entities/Car';

@injectable()
export default class ShowCarService {
  constructor(@inject('car') private carsRepository: ICarsRepository) {}
  public async execute({ id }: IFindByCarId): Promise<Car> {
    const carExists = await this.carsRepository.findById(id);
    if (!carExists) throw new ApiError('Carro não encontrado', 404);
    return this.carsRepository.findById(id);
  }
}
