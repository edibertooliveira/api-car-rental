import 'reflect-metadata';
import { describe, test, expect } from '@jest/globals';
import { DestroyCarService } from '.';
import { ICarsRepository } from '../repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '../repositories/in-memory/CarsRepositoryInMemory';
import carObjects from './utils/carObjects';
import ApiError from '@shared/errors/ApiError';
import { ICar } from '../dtos/ICar';

describe('DestroyCarService', () => {
  let carsRepository: ICarsRepository;
  let destroyCarService: DestroyCarService;
  let car: ICar;
  beforeEach(async () => {
    carsRepository = new CarsRepositoryInMemory();
    destroyCarService = new DestroyCarService(carsRepository);
    car = { ...(await carsRepository.create(carObjects.create)) };
  });
  describe('impossible to get a car', () => {
    test('If it returns ApiError message "car not found", status 404', async () => {
      car.id = '999';
      await expect(() =>
        destroyCarService.execute({ id: car.id }),
      ).rejects.toEqual(new ApiError('Carro não encontrado', 404));
    });
  });
  describe('it is possible to delete a car', () => {
    test('if you successfully delete a car', async () => {
      await destroyCarService.execute({
        id: car.id,
      });
      const result = await carsRepository.findById(car.id);
      expect(result).not.toBeTruthy();
    });
  });
});
