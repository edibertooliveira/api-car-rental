import 'reflect-metadata';
import faker from 'faker';
import { describe, test, expect } from '@jest/globals';
import { DestroyCarService } from '.';
import { CarsRepositoryInMemory } from '../repositories/in-memory/CarsRepositoryInMemory';
import ApiError from '@shared/errors/ApiError';
import { ICreateCar } from '../dtos/ICreateCar';
import Car from '../infra/typeorm/entities/Car';
import CategoriesRepositoryInMemory from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';

describe('DestroyCarService', () => {
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let destroyCarService: DestroyCarService;
  let car: Car;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
  let carCreateObj: ICreateCar;

  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    destroyCarService = new DestroyCarService(carsRepositoryInMemory);
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();

    const category = await categoriesRepositoryInMemory.create({
      name: faker.vehicle.model(),
      description: faker.lorem.sentence(),
    });

    carCreateObj = {
      name: faker.vehicle.model(),
      brand: faker.vehicle.manufacturer(),
      description: faker.lorem.sentence(),
      daily_rate: Number(faker.finance.amount()),
      category_id: category.id,
      available: true,
      license_plate: `${faker.finance.currencyCode()}-${faker.finance.mask()}`,
    } as ICreateCar;
    car = { ...(await carsRepositoryInMemory.create(carCreateObj)) };
  });
  describe('impossible to get a car', () => {
    test('If it return "car not found" is an instance of "ApiError"', async () => {
      car.id = '999';
      await expect(
        destroyCarService.execute({ id: car.id }),
      ).rejects.toBeInstanceOf(ApiError);
    });
  });
  describe('it is possible to delete a car', () => {
    test('if you successfully delete a car', async () => {
      await destroyCarService.execute({
        id: car.id,
      });
      const result = await carsRepositoryInMemory.findById(car.id);
      expect(result).not.toBeTruthy();
    });
  });
});
