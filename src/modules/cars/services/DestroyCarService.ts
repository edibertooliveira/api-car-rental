import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '../repositories/ICarsRepository';
import ApiError from '@shared/errors/ApiError';
import { IDestroyByCarId } from '../dto/IDestroyByCarId';

@injectable()
export default class DestroyCarService {
  constructor(@inject('car') private carsRepository: ICarsRepository) {}
  public async execute({ id }: IDestroyByCarId): Promise<void> {
    const carExists = await this.carsRepository.findById(id);
    if (!carExists) throw new ApiError('Carro não encontrado', 404);
    this.carsRepository.delete(id);
  }
}
