import 'reflect-metadata';

import { describe, test, expect } from '@jest/globals';
import { ICarsRepository } from '../../modules/cars/domain/repositories/ICarsRepository';
import {
  CreateCarService,
  ListCarsService,
  ShowCarService,
  UpdateCarService,
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
  };
  describe('CreateCarService', () => {
    let createCarService: CreateCarService;
    beforeEach(() => {
      carsRepository = new CarsRepositoryMake();
      createCarService = new CreateCarService(carsRepository);
    });

    describe('impossível criar um carro', () => {
      describe('"name" duplicado no banco', () => {
        test('Se retorna ApiError message "Nome do carro já utilizado", status 409', async () => {
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
    describe('possível criar um carro', () => {
      test('Se retorna chave "id", "created_at"', async () => {
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
    describe('possível listar carro', () => {
      test('Se retorna uma lista de carros com sucesso', async () => {
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

    describe('impossível buscar um carro', () => {
      test('Se retorna ApiError message "carro não encontrado", status 404', async () => {
        try {
          await showCarService.execute({ id: '999' });
        } catch (err) {
          expect(err.message).toEqual('Carro não encontrado');
          expect(err.statusCode).toEqual(404);
        }
      });
    });

    describe('possível buscar um carro', () => {
      test('Se retorna tipo object', async () => {
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
    describe('impossível buscar um carro', () => {
      test('Se retorna ApiError message "carro não encontrado", status 404', async () => {
        try {
          car.id = '999';
          await updateCarService.execute(car);
        } catch (err) {
          expect(err.message).toEqual('Carro não encontrado');
          expect(err.statusCode).toEqual(404);
        }
      });
    });

    describe('possivel buscar um carro', () => {
      describe('"name" duplicado no banco', () => {
        test('retornar ApiError message "Nome do carro já utilizado", status 409', async () => {
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
    describe('possivel alterar um carro', () => {
      test('se o campo "name" não é false', () => {
        expect(
          updateCarService.execute({ ...car, name: null }),
        ).resolves.not.toHaveProperty('name', null);
      });
      test('se o campo "brand" não é false', () => {
        expect(
          updateCarService.execute({ ...car, brand: null }),
        ).resolves.not.toHaveProperty('brand', null);
      });
      test('se o campo "description" não é false', () => {
        expect(
          updateCarService.execute({ ...car, description: null }),
        ).resolves.not.toHaveProperty('description', null);
      });
      test('se o campo "daily_rate" não é false', () => {
        expect(
          updateCarService.execute({ ...car, daily_rate: null }),
        ).resolves.not.toHaveProperty('daily_rate', null);
      });
      test('se o campo "license_plate" não é false', () => {
        expect(
          updateCarService.execute({ ...car, license_plate: null }),
        ).resolves.not.toHaveProperty('license_plate', null);
      });
      test('', () => {
        expect(
          updateCarService.execute({ ...car, license_plate: null }),
        ).resolves.not.toHaveProperty('license_plate', null);
      });
    });
  });
});
