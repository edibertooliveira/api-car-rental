import { Request, Response } from 'express';
import { CreateCategoryService } from '@modules/categories/services';

import { container } from 'tsyringe';

export default class CarsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const createUser = container.resolve(CreateCategoryService);
    const car = await createUser.execute({
      name,
      description,
    });
    return response.status(201).json(car);
  }
}
