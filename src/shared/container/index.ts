import { container } from 'tsyringe';
import { ICarsRepository } from '../../modules/cars/domain/repositories/ICarsRepository';
import CarsRepository from '../../modules/cars/typeorm/repositories/CarsRepository';

container.registerSingleton<ICarsRepository>('car', CarsRepository);
