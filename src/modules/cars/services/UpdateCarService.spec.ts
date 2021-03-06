import 'reflect-metadata';
import faker from 'faker';
import { describe, test, expect } from '@jest/globals';
import { UpdateCarService } from '.';
import { CarsRepositoryInMemory } from '../repositories/in-memory/CarsRepositoryInMemory';
import ApiError from '@shared/errors/ApiError';
import { ICreateCar } from '../dtos/ICreateCar';
import Car from '../infra/typeorm/entities/Car';
import CategoriesRepositoryInMemory from '@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory';

describe('UpdateCarService', () => {
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let updateCarService: UpdateCarService;
  let car: Car;
  let carObj: ICreateCar[];
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  beforeEach(async () => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    updateCarService = new UpdateCarService(
      carsRepositoryInMemory,
      categoriesRepositoryInMemory,
    );

    const category = await categoriesRepositoryInMemory.create({
      name: faker.vehicle.model(),
      description: faker.lorem.sentence(),
    });

    carObj = [
      {
        name: faker.vehicle.model(),
        brand: faker.vehicle.manufacturer(),
        description: faker.lorem.sentence(),
        dailyRate: Number(faker.finance.amount()),
        categoryId: category.id,
        available: true,
        licensePlate: `${faker.finance.currencyCode()}-${faker.finance.mask()}`,
      } as ICreateCar,
      {
        name: faker.vehicle.model(),
        brand: faker.vehicle.manufacturer(),
        description: faker.lorem.sentence(),
        dailyRate: Number(faker.finance.amount()),
        categoryId: category.id,
        available: false,
        licensePlate: `${faker.finance.currencyCode()}-${faker.finance.mask()}`,
      } as ICreateCar,
    ];
    car = { ...(await carsRepositoryInMemory.create(carObj[0])) };
  });

  describe('impossible to get a car', () => {
    test('If it return "car not found" is an instance of "ApiError"', async () => {
      car.id = '999';
      await expect(updateCarService.execute(car)).rejects.toBeInstanceOf(
        ApiError,
      );
    });
  });
  describe('it is possible to get a car', () => {
    describe('duplicate "name" in the bank', () => {
      test('If it return "Car name already used" is an instance of "ApiError"', async () => {
        const car = await carsRepositoryInMemory.create({
          ...carObj[0],
          name: faker.vehicle.model(),
        });
        const newNameCar = { ...car, name: carObj[0].name };
        await expect(
          updateCarService.execute(newNameCar),
        ).rejects.toBeInstanceOf(ApiError);
      });
    });
    test('If it return "Category not found" is an instance of "ApiError"', async () => {
      car.categoryId = '999';
      await expect(updateCarService.execute(car)).rejects.toBeInstanceOf(
        ApiError,
      );
    });
  });
  describe('it is possible to change a car', () => {
    test('if the "name" field does not return false', async () => {
      await expect(
        updateCarService.execute({ ...car, name: null }),
      ).resolves.not.toHaveProperty('name', null);
    });
    test('if the "brand" field does not return false', async () => {
      await expect(
        updateCarService.execute({ ...car, brand: null }),
      ).resolves.not.toHaveProperty('brand', null);
    });
    test('if the "description" field does not return false', async () => {
      await expect(
        updateCarService.execute({ ...car, description: null }),
      ).resolves.not.toHaveProperty('description', null);
    });
    test('if the "dailyRate" field does not return false', async () => {
      await expect(
        updateCarService.execute({ ...car, dailyRate: null }),
      ).resolves.not.toHaveProperty('dailyRate', null);
    });
    test('if the "categoryId" field does not return false', async () => {
      await expect(
        updateCarService.execute({ ...car, categoryId: null }),
      ).resolves.not.toHaveProperty('categoryId', null);
    });
    test('if the "licensePlate" field does not return false "licensePlate"', async () => {
      await expect(
        updateCarService.execute({ ...car, licensePlate: null }),
      ).resolves.not.toHaveProperty('licensePlate', null);
    });
    test('if fields have been updated successfully', async () => {
      const category = await categoriesRepositoryInMemory.create({
        name: faker.vehicle.model(),
        description: faker.lorem.sentence(),
      });
      const result = await updateCarService.execute({
        id: car.id,
        ...carObj[1],
        categoryId: category.id,
      });
      expect(result).not.toHaveProperty('name', car.name);
      expect(result).not.toHaveProperty('brand', car.brand);
      expect(result).not.toHaveProperty('description', car.description);
      expect(result).not.toHaveProperty('dailyRate', car.dailyRate);
      expect(result).not.toHaveProperty('categoryId', car.categoryId);
      expect(result).not.toHaveProperty('licensePlate', car.licensePlate);
    });
  });
});
