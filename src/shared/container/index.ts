import { container } from 'tsyringe';
import {ICarRepository} from "../../modules/cars/domain/repositories/ICarRepository";
import CarRepository from "../../modules/cars/typeorm/repositories/CarRepository";

container.registerSingleton<ICarRepository>('car', CarRepository);
