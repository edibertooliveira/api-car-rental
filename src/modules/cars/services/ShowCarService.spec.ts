import 'reflect-metadata';
import { describe, test, expect } from '@jest/globals';
import { ShowCarService } from '.';
import { ICarsRepository } from '../repositories/ICarsRepository';
import { CarsRepositoryMake } from '../repositories/in-memory/CarsRepositoryMake';
import carObjects from './utils/carObjects';

describe('ShowCarService', () => {
  let carsRepository: ICarsRepository;
  let showCarService: ShowCarService;

  beforeEach(() => {
    carsRepository = new CarsRepositoryMake();
    showCarService = new ShowCarService(carsRepository);
  });

  describe('impossible to get a car', () => {
    test('If it returns ApiError message "car not found", status 404', async () => {
      try {
        await showCarService.execute({ id: '999' });
      } catch (err) {
        expect(err.message).toEqual('Carro não encontrado');
        expect(err.statusCode).toEqual(404);
      }
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
