import { Request, Response } from 'express';
import {
  ShowCarService,
  UpdateCarService,
  DestroyCarService,
} from '../services';

import { container } from 'tsyringe';

export default class CarsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listCars = container.resolve(ShowCarService);
    const car = await listCars.execute({ id: request.params.id });
    return response.status(200).json(car);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, brand, description, daily_rate, available, license_plate } =
      request.body;
    const updateUser = container.resolve(UpdateCarService);
    const car = await updateUser.execute({
      id: request.params.id,
      name,
      brand,
      description,
      daily_rate,
      available,
      license_plate,
    });
    return response.status(200).json(car);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const destroyCar = container.resolve(DestroyCarService);
    await destroyCar.execute({
      id: request.params.id,
    });
    return response.status(204).json({});
  }
}
