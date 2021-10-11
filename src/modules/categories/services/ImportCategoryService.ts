import { inject, injectable } from 'tsyringe';
import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse';
import { uploadFolder } from '@config/multerConfig';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/entities/Category';

interface IImportCategory {
  filename: string;
}

@injectable()
export default class ImportCategoryService {
  constructor(
    @inject('category') private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ filename }: IImportCategory): Promise<Category[]> {
    return new Promise((resolver, rejects) => {
      const csvConversor = csvParse();
      const file = path.resolve(uploadFolder, filename);
      const categories: Category[] = [];
      fs.createReadStream(file)
        .pipe(csvConversor)
        .on('data', async ([name, description]) => {
          const category = await this.categoriesRepository.create({
            name,
            description,
          });
          categories.push(category);
        })
        .on('end', () => resolver(categories))
        .on('error', err => rejects(err));
    });
  }
}
