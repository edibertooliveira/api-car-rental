import 'reflect-metadata';
import { describe, test, expect } from '@jest/globals';
import { UpdateCarService } from '.';
import { ICarsRepository } from '../repositories/ICarsRepository';
import { CarsRepositoryMake } from '../repositories/in-memory/CarsRepositoryMake';
import carObjects from './utils/carObjects';
import { ICar } from '../dtos/ICar';

describe('UpdateCarService', () => {
  let carsRepository: ICarsRepository;
  let updateCarService: UpdateCarService;
  let car: ICar;

  beforeEach(async () => {
    carsRepository = new CarsRepositoryMake();
    updateCarService = new UpdateCarService(carsRepository);
    car = { ...(await carsRepository.create(carObjects.create)) };
  });

  describe('impossible to get a car', () => {
    test('If it returns ApiError message "car not found", status 404', async () => {
      try {
        car.id = '999';
        await updateCarService.execute(car);
      } catch (err) {
        expect(err.message).toEqual('Carro não encontrado');
        expect(err.statusCode).toEqual(404);
      }
    });
  });
  describe('it is possible to get a car', () => {
    describe('duplicate "name" in the bank', () => {
      test('return ApiError message "Car name already used", status 409', async () => {
        try {
          const car = await carsRepository.create({
            ...carObjects.create,
            name: 'any duble',
          });
          const newNameCar = { ...car, name: carObjects.create.name };
          await updateCarService.execute(newNameCar);
        } catch (err) {
          expect(err.message).toEqual('Nome do carro já utilizado');
          expect(err.statusCode).toEqual(409);
        }
      });
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
    test('if the "daily_rate" field does not return false', async () => {
      await expect(
        updateCarService.execute({ ...car, daily_rate: null }),
      ).resolves.not.toHaveProperty('daily_rate', null);
    });
    test('if the "license_plate" field does not return false "license_plate"', async () => {
      await expect(
        updateCarService.execute({ ...car, license_plate: null }),
      ).resolves.not.toHaveProperty('license_plate', null);
    });
    test('if fields have been updated successfully', async () => {
      const result = await updateCarService.execute({
        id: car.id,
        ...carObjects.update,
      });
      expect(result).not.toHaveProperty('name', car.name);
      expect(result).not.toHaveProperty('brand', car.brand);
      expect(result).not.toHaveProperty('description', car.description);
      expect(result).not.toHaveProperty('daily_rate', car.daily_rate);
      expect(result).not.toHaveProperty('license_plate', car.license_plate);
    });
  });
});
