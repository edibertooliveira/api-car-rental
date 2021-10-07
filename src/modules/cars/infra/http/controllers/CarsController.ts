import { Request, Response } from 'express';
import { CreateCarService, ListCarsService } from '@modules/cars/services';
import { StatusCodes } from 'http-status-codes';

import { container } from 'tsyringe';

export default class CarsController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listCars = container.resolve(ListCarsService);
    const cars = await listCars.execute();
    return response.status(StatusCodes.OK).json(cars);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      brand,
      description,
      dailyRate,
      available,
      categoryId,
      licensePlate,
    } = request.body;

    const createUser = container.resolve(CreateCarService);
    const car = await createUser.execute({
      name,
      brand,
      description,
      dailyRate,
      available,
      licensePlate,
      categoryId,
    });
    return response.status(StatusCodes.CREATED).json(car);
  }
}
