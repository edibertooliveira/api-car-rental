import 'reflect-metadata';
import faker from 'faker';
import { describe, test, expect } from '@jest/globals';
import ApiError from '@shared/errors/ApiError';
import { CreateCategoryService } from './';
import CategoriesRepositoryInMemory from '../repositories/in-memory/CategoriesRepositoryInMemory';
import { ICreateCategory } from '../dtos/ICreateCategory';

describe('CreateCategoryService', () => {
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
  let createCategoryService: CreateCategoryService;
  let category: ICreateCategory;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryService = new CreateCategoryService(
      categoriesRepositoryInMemory,
    );
    category = {
      name: faker.vehicle.model(),
    } as ICreateCategory;
  });

  describe('impossible to create a car', () => {
    describe('duplicate "name" in the bank', () => {
      test('If it return "Category name already used" is an instance of "ApiError"', async () => {
        await categoriesRepositoryInMemory.create(category);
        await expect(
          createCategoryService.execute(category),
        ).rejects.toBeInstanceOf(ApiError);
      });
    });
  });
  describe('possible to create a car', () => {
    test('If key returns "id", "created_at"', async () => {
      const response = await createCategoryService.execute(category);
      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('created_at');
    });
  });
});
