import { Request, Response } from 'express';
import { CreateCarService, ListCarsService } from '@modules/cars/services';

import { container } from 'tsyringe';

export default class CarsController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listCars = container.resolve(ListCarsService);
    const cars = await listCars.execute();
    return response.status(200).json(cars);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, brand, description, daily_rate, available, license_plate } =
      request.body;
    const createUser = container.resolve(CreateCarService);
    const car = await createUser.execute({
      name,
      brand,
      description,
      daily_rate,
      available,
      license_plate,
    });
    return response.status(201).json(car);
  }
}
