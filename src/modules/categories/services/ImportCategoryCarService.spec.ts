import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import CategoriesRepositoryInMemory from '../repositories/in-memory/CategoriesRepositoryInMemory';
import ImportCategoryService from './ImportCategoryService';

describe('ImportCategoryCarService.ts', () => {
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
  let importCategoryService: ImportCategoryService;

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    importCategoryService = new ImportCategoryService(
      categoriesRepositoryInMemory,
    );
  });

  describe('Possible to import category', () => {
    test('If return array of categories', async () => {
      const result = await importCategoryService.execute({
        filename: 'categories_cars.csv',
      });
      expect(result).toBeTruthy();
      expect(result).toHaveLength(3);
    });
  });
});
