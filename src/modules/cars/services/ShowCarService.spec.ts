import 'reflect-metadata';
import { describe, test, expect } from '@jest/globals';
import { ShowCarService } from '.';
import { ICarsRepository } from '../repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '../repositories/in-memory/CarsRepositoryInMemory';
import carObjects from './utils/carObjects';
import ApiError from '@shared/errors/ApiError';

describe('ShowCarService', () => {
  let carsRepository: ICarsRepository;
  let showCarService: ShowCarService;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    showCarService = new ShowCarService(carsRepository);
  });

  describe('impossible to get a car', () => {
    test('If it returns ApiError message "car not found", status 404', async () => {
      await expect(() => showCarService.execute({ id: '999' })).rejects.toEqual(
        new ApiError('Carro não encontrado', 404),
      );
    });
  });

  describe('possible to get a car', () => {
    test('If it returns object type', async () => {
      const car = await carsRepository.create(carObjects.create);
      expect(
        JSON.stringify(await showCarService.execute({ id: car.id })),
      ).toStrictEqual(JSON.stringify(car));
      expect(typeof car).toBe('object');
    });
  });
});
