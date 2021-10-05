import 'reflect-metadata';
import { describe, test, expect } from '@jest/globals';
import { ListCarsService } from '.';
import { CarsRepositoryInMemory } from '../repositories/in-memory/CarsRepositoryInMemory';

describe('ListCarsService', () => {
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let listCarsService: ListCarsService;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsService = new ListCarsService(carsRepositoryInMemory);
  });
  describe('possible to list car', () => {
    test('If a list of cars is returned successfully', async () => {
      const response = await listCarsService.execute();
      expect(response).toBeTruthy();
    });
  });
});
