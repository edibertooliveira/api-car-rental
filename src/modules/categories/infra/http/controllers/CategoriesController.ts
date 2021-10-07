import { Request, Response } from 'express';
import { CreateCategoryService } from '@modules/categories/services';

import { container } from 'tsyringe';
import { StatusCodes } from 'http-status-codes';

export default class CarsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const createUser = container.resolve(CreateCategoryService);
    const car = await createUser.execute({
      name,
      description,
    });
    return response.status(StatusCodes.CREATED).json(car);
  }
}
