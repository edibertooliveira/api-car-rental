import 'reflect-metadata';
import { describe, test, expect } from '@jest/globals';
import { ICarsRepository } from '../../modules/cars/domain/repositories/ICarsRepository';
import { CreateCarService, ListCarsService } from '../../modules/cars/services';
import { CarsRepositoryMake } from '../mocks/CarsRepositoryMake';
import ApiError from '../../shared/errors/ApiError';

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
  };
  describe('CraeteCarService', () => {
    let createCarService: CreateCarService;
    beforeEach(() => {
      carsRepository = new CarsRepositoryMake();
      createCarService = new CreateCarService(carsRepository);
    });

    test('Se é impossível criar um carro que já existe', async () => {
      await createCarService.execute(optional.createCar);
      await expect(() =>
        createCarService.execute(optional.createCar),
      ).rejects.toBeInstanceOf(ApiError);
      try {
        await createCarService.execute(optional.createCar);
      } catch (err) {
        expect(err.message).toEqual('There is already one car with this name');
        expect(err.statusCode).toEqual(409);
      }
    });
    test('Se é possível criar um carro com sucesso', async () => {
      const response = await createCarService.execute(optional.createCar);
      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('created_at');
    });
  });

  describe('ListCarsService', () => {
    let listCarsService: ListCarsService;

    beforeEach(() => {
      carsRepository = new CarsRepositoryMake();
      listCarsService = new ListCarsService(carsRepository);
    });
    test('Se é possível buscar um carros com sucesso', async () => {
      const response = await listCarsService.execute();
      expect(response).toBeTruthy();
    });
  });
});
