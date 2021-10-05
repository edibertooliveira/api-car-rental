import 'reflect-metadata';
import faker from 'faker';
import { describe, test, expect } from '@jest/globals';
import ApiError from '@shared/errors/ApiError';
import { CreateCarService } from '.';
import { CarsRepositoryInMemory } from '../repositories/in-memory/CarsRepositoryInMemory';
import { ICreateCar } from '../dtos/ICreateCar';

describe('CreateCarService', () => {
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let createCarService: CreateCarService;
  let carCreateObj: ICreateCar;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarService = new CreateCarService(carsRepositoryInMemory);
    carCreateObj = {
      name: faker.vehicle.model(),
      brand: faker.vehicle.manufacturer(),
      description: faker.lorem.sentence(),
      daily_rate: Number(faker.finance.amount()),
      available: true,
      license_plate: `${faker.finance.currencyCode()}-${faker.finance.mask()}`,
    } as ICreateCar;
  });

  describe('impossible to create a car', () => {
    describe('duplicate "name" in the bank', () => {
      test('If it return "Car name already used" is an instance of "ApiError"', async () => {
        await createCarService.execute(carCreateObj);
        await expect(
          createCarService.execute(carCreateObj),
        ).rejects.toBeInstanceOf(ApiError);
      });
    });
  });
  describe('possible to create a car', () => {
    test('If key returns "id", "created_at"', async () => {
      const response = await createCarService.execute(carCreateObj);
      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('created_at');
    });
  });
});
