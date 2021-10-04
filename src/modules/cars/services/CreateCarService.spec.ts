import 'reflect-metadata';
import { describe, test, expect } from '@jest/globals';
import ApiError from '@shared/errors/ApiError';
import { CreateCarService } from '.';
import { ICarsRepository } from '../repositories/ICarsRepository';
import { CarsRepositoryMake } from '../repositories/in-memory/CarsRepositoryMake';
import carObjects from './utils/carObjects';

describe('CreateCarService', () => {
  let carsRepository: ICarsRepository;
  let createCarService: CreateCarService;

  beforeEach(() => {
    carsRepository = new CarsRepositoryMake();
    createCarService = new CreateCarService(carsRepository);
  });

  describe('impossible to create a car', () => {
    describe('duplicate "name" in the bank', () => {
      test('If returns ApiError message "Car name already used", status 409', async () => {
        await createCarService.execute(carObjects.create);
        await expect(() =>
          createCarService.execute(carObjects.create),
        ).rejects.toBeInstanceOf(ApiError);
        try {
          await createCarService.execute(carObjects.create);
        } catch (err) {
          expect(err.message).toEqual('Nome do carro já utilizado');
          expect(err.statusCode).toEqual(409);
        }
      });
    });
  });
  describe('possible to create a car', () => {
    test('If key returns "id", "created_at"', async () => {
      const response = await createCarService.execute(carObjects.create);
      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('created_at');
    });
  });
});
