// import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import fs from 'fs';
import path from 'path';

import { ICategoriesRepository } from '../repositories/ICategoriesRepository';
// import ApiError from '@shared/errors/ApiError';

@injectable()
export default class ImportCategoryService {
  constructor(
    @inject('category') private categoriesRepository: ICategoriesRepository,
  ) {}
  public async execute(): Promise<Buffer> {
    const files = fs.readFileSync(
      path.resolve(__dirname, '../../../../', 'database/categories_cars.csv'),
    );
    return files;
  }
}
