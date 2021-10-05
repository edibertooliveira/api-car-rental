import 'reflect-metadata';
import faker from 'faker';
import { describe, test, expect } from '@jest/globals';
import { ShowCarService } from '.';
import { CarsRepositoryInMemory } from '../repositories/in-memory/CarsRepositoryInMemory';
import ApiError from '@shared/errors/ApiError';
import { ICreateCar } from '../dtos/ICreateCar';

describe('ShowCarService', () => {
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let showCarService: ShowCarService;
  let carCreateObj: ICreateCar;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    showCarService = new ShowCarService(carsRepositoryInMemory);
    carCreateObj = {
      name: faker.vehicle.model(),
      brand: faker.vehicle.manufacturer(),
      description: faker.lorem.sentence(),
      daily_rate: Number(faker.finance.amount()),
      available: true,
      license_plate: `${faker.finance.currencyCode()}-${faker.finance.mask()}`,
    } as ICreateCar;
  });

  describe('impossible to get a car', () => {
    test('If it return "car not found" is an instance of "ApiError"', async () => {
      await expect(() =>
        showCarService.execute({ id: '999' }),
      ).rejects.toBeInstanceOf(ApiError);
    });
  });

  describe('possible to get a car', () => {
    test('If it returns object type', async () => {
      const car = await carsRepositoryInMemory.create(carCreateObj);
      const result = JSON.stringify(car);
      expect(
        JSON.stringify(await showCarService.execute({ id: car.id })),
      ).toStrictEqual(result);
      expect(typeof car).toBe('object');
    });
  });
});
