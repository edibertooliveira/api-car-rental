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
    test('If return buff', async () => {
      const result = await importCategoryService.execute();
      expect(result).toBeTruthy();
    });
  });
});
