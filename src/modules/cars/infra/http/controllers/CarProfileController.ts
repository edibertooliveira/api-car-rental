import { Request, Response } from 'express';
import {
  ShowCarService,
  UpdateCarService,
  DestroyCarService,
} from '@modules/cars/services';

import { container } from 'tsyringe';
import { StatusCodes } from 'http-status-codes';

export default class CarsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listCars = container.resolve(ShowCarService);
    const car = await listCars.execute({ id: request.params.id });
    return response.status(StatusCodes.OK).json(car);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      brand,
      description,
      dailyRate,
      available,
      categoryId,
      licensePlate,
    } = request.body;
    const updateUser = container.resolve(UpdateCarService);
    const car = await updateUser.execute({
      id: request.params.id,
      name,
      brand,
      description,
      dailyRate,
      available,
      categoryId,
      licensePlate,
    });
    return response.status(StatusCodes.OK).json(car);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const destroyCar = container.resolve(DestroyCarService);
    await destroyCar.execute({
      id: request.params.id,
    });
    return response.status(StatusCodes.NO_CONTENT).json({});
  }
}
