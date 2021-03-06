import 'reflect-metadata';
import faker from 'faker';
import { describe, test, expect } from '@jest/globals';
import ApiError from '@shared/errors/ApiError';
import { CreateCarService } from '.';
import { CarsRepositoryInMemory } from '../repositories/in-memory/CarsRepositoryInMemory';
import { ICreateCar } from '../dtos/ICreateCar';
import CategoriesRepositoryInMemory from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';

describe('CreateCarService', () => {
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
  let createCarService: CreateCarService;
  let carCreateObj: ICreateCar;

  beforeEach(async () => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarService = new CreateCarService(
      carsRepositoryInMemory,
      categoriesRepositoryInMemory,
    );

    const category = await categoriesRepositoryInMemory.create({
      name: faker.vehicle.model(),
      description: faker.lorem.sentence(),
    });

    carCreateObj = {
      name: faker.vehicle.model(),
      brand: faker.vehicle.manufacturer(),
      description: faker.lorem.sentence(),
      dailyRate: Number(faker.finance.amount()),
      categoryId: category.id,
      available: true,
      licensePlate: `${faker.finance.currencyCode()}-${faker.finance.mask()}`,
    };
  });

  describe('impossible to create a car', () => {
    describe('duplicate "name" in the bank', () => {
      test('If it return "Car name already used" is an instance of "ApiError"', async () => {
        await createCarService.execute(carCreateObj);
        await expect(
          createCarService.execute(carCreateObj),
        ).rejects.toBeInstanceOf(ApiError);
      });
      test('If it return "Category not found" is an instance of "ApiError"', async () => {
        carCreateObj.categoryId = '999';
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
