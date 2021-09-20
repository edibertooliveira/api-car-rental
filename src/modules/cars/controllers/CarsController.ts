import { Request, Response } from 'express';
import { CreateCarService, ListCarsService } from '../services';

import { container } from 'tsyringe';

export default class CarsController {
  public async index(_req: Request, res: Response): Promise<Response> {
    const listCars = container.resolve(ListCarsService);
    const cars = await listCars.execute();
    return res.status(200).json(cars);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name,
      brand,
      description,
      daily_rate,
      available,
      license_plate, } = req.body;
    const createUser = container.resolve(CreateCarService);
    const car = await createUser.execute({
      name,
      brand,
      description,
      daily_rate,
      available,
      license_plate,
    });
    return res.status(201).json(car);
  }
}