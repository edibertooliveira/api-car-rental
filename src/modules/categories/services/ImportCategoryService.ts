import { inject, injectable } from 'tsyringe';
import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse';

import { ICategoriesRepository } from '../repositories/ICategoriesRepository';
import { ICreateCategory } from '../dtos/ICreateCategory';

interface IImportCategory {
  filename: string;
}

@injectable()
export default class ImportCategoryService {
  constructor(
    @inject('category') private categoriesRepository: ICategoriesRepository,
  ) {}
  public async execute({
    filename,
  }: IImportCategory): Promise<ICreateCategory[]> {
    return new Promise((resolve, reject) => {
      const file = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'database',
        filename,
      );
      const stream = fs.createReadStream(file);
      const categories: ICreateCategory[] = [];
      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async chunk => {
          //3
          const [name, description] = chunk;

          categories.push({
            name,
            description,
          });
        })
        .on('end', async () => {
          //1
          resolve(categories);
        })
        .on('error', error => {
          reject(error);
        });
    });
  }
}
