import 'reflect-metadata';
import { describe, test, expect } from '@jest/globals';
import { ListCarsService } from '.';
import { ICarsRepository } from '../repositories/ICarsRepository';
import { CarsRepositoryMake } from '../repositories/in-memory/CarsRepositoryMake';

describe('ListCarsService', () => {
  let carsRepository: ICarsRepository;
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
