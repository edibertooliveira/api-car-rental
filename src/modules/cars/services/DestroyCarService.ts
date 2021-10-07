import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '../repositories/ICarsRepository';
import ApiError from '@shared/errors/ApiError';
import { IDestroyByCarId } from '../dtos/IDestroyByCarId';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class DestroyCarService {
  constructor(@inject('car') private carsRepository: ICarsRepository) {}
  public async execute({ id }: IDestroyByCarId): Promise<void> {
    const carExists = await this.carsRepository.findById(id);
    if (!carExists) throw new ApiError('Car not found', StatusCodes.NOT_FOUND);
    this.carsRepository.delete(id);
  }
}
