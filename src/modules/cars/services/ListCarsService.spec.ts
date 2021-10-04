import 'reflect-metadata';
import { describe, test, expect } from '@jest/globals';
import { ListCarsService } from '.';
import { ICarsRepository } from '../repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '../repositories/in-memory/CarsRepositoryInMemory';

describe('ListCarsService', () => {
  let carsRepository: ICarsRepository;
  let listCarsService: ListCarsService;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listCarsService = new ListCarsService(carsRepository);
  });
  describe('possible to list car', () => {
    test('If a list of cars is returned successfully', async () => {
      const response = await listCarsService.execute();
      expect(response).toBeTruthy();
    });
  });
});
