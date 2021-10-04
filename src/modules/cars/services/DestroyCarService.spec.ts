import 'reflect-metadata';
import { describe, test, expect } from '@jest/globals';
import { DestroyCarService } from '.';
import { ICarsRepository } from '../repositories/ICarsRepository';
import { CarsRepositoryMake } from '../repositories/in-memory/CarsRepositoryMake';
import carObjects from './utils/carObjects';

describe('DestroyCarService', () => {
  let carsRepository: ICarsRepository;
  let destroyCarService: DestroyCarService;
  let car;
  beforeEach(async () => {
    carsRepository = new CarsRepositoryMake();
    destroyCarService = new DestroyCarService(carsRepository);
    car = { ...(await carsRepository.create(carObjects.create)) };
  });
  describe('impossible to get a car', () => {
    test('If it returns ApiError message "car not found", status 404', async () => {
      try {
        car.id = '999';
        await destroyCarService.execute({ id: car.id });
      } catch (err) {
        expect(err.message).toEqual('Carro não encontrado');
        expect(err.statusCode).toEqual(404);
      }
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
