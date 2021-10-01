import 'reflect-metadata';

import { describe, test, expect } from '@jest/globals';
import { ICarsRepository } from '../../modules/cars/domain/repositories/ICarsRepository';
import {
  CreateCarService,
  ListCarsService,
  ShowCarService,
  UpdateCarService,
  DestroyCarService,
} from '../../modules/cars/services';
import { CarsRepositoryMake } from '../mocks/CarsRepositoryMake';
import ApiError from '@shared/errors/ApiError';

describe('cars', () => {
  let carsRepository: ICarsRepository;
  const optional = {
    createCar: {
      name: 'any cars',
      brand: 'any brand',
      description: 'any description',
      daily_rate: 1000,
      available: true,
      license_plate: '000001',
    },
    updateCar: {
      name: 'any cars 2',
      brand: 'any brand 2',
      description: 'any description 2',
      daily_rate: 1001,
      available: false,
      license_plate: '000002',
    },
  };
  describe('CreateCarService', () => {
    let createCarService: CreateCarService;
    beforeEach(() => {
      carsRepository = new CarsRepositoryMake();
      createCarService = new CreateCarService(carsRepository);
    });

    describe('impossible to create a car', () => {
      describe('duplicate "name" in the bank', () => {
        test('If returns ApiError message "Car name already used", status 409', async () => {
          await createCarService.execute(optional.createCar);
          await expect(() =>
            createCarService.execute(optional.createCar),
          ).rejects.toBeInstanceOf(ApiError);
          try {
            await createCarService.execute(optional.createCar);
          } catch (err) {
            expect(err.message).toEqual('Nome do carro já utilizado');
            expect(err.statusCode).toEqual(409);
          }
        });
      });
    });
    describe('possible to create a car', () => {
      test('If key returns "id", "created_at"', async () => {
        const response = await createCarService.execute(optional.createCar);
        expect(response).toHaveProperty('id');
        expect(response).toHaveProperty('created_at');
      });
    });
  });

  describe('ListCarsService', () => {
    let listCarsService: ListCarsService;

    beforeEach(() => {
      carsRepository = new CarsRepositoryMake();
      listCarsService = new ListCarsService(carsRepository);
    });
    describe('possible to list car', () => {
      test('If a list of cars is returned successfully', async () => {
        const response = await listCarsService.execute();
        expect(response).toBeTruthy();
      });
    });
  });

  describe('ShowCarService', () => {
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
        const car = await carsRepository.create(optional.createCar);
        expect(
          JSON.stringify(await showCarService.execute({ id: car.id })),
        ).toStrictEqual(JSON.stringify(car));
        expect(typeof car).toBe('object');
      });
    });
  });

  describe('UpdateCarService', () => {
    let updateCarService: UpdateCarService;
    let car;
    beforeEach(async () => {
      carsRepository = new CarsRepositoryMake();
      updateCarService = new UpdateCarService(carsRepository);
      car = { ...(await carsRepository.create(optional.createCar)) };
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
              ...optional.createCar,
              name: 'any duble',
            });
            const newNameCar = { ...car, name: optional.createCar.name };
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
          ...optional.updateCar,
        });
        expect(result).not.toHaveProperty('name', car.name);
        expect(result).not.toHaveProperty('brand', car.brand);
        expect(result).not.toHaveProperty('description', car.description);
        expect(result).not.toHaveProperty('daily_rate', car.daily_rate);
        expect(result).not.toHaveProperty('license_plate', car.license_plate);
      });
    });
  });
  describe('DestroyCarService', () => {
    let destroyCarService: DestroyCarService;
    let car;
    beforeEach(async () => {
      carsRepository = new CarsRepositoryMake();
      destroyCarService = new DestroyCarService(carsRepository);
      car = { ...(await carsRepository.create(optional.createCar)) };
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
});
