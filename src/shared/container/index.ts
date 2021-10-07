import { container } from 'tsyringe';
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository';
import CarsRepository from '../../modules/cars/infra/typeorm/repositories/CarsRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';

container.registerSingleton<ICarsRepository>('car', CarsRepository);
container.registerSingleton<ICategoriesRepository>(
  'category',
  CategoriesRepository,
);
