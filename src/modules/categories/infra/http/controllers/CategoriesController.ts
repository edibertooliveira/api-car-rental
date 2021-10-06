import { Request, Response } from 'express';
import { CreateCategoryService } from '@modules/categories/services';

import { container } from 'tsyringe';

export default class CarsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const createUser = container.resolve(CreateCategoryService);
    const car = await createUser.execute({
      name,
    });
    return response.status(201).json(car);
  }
}
