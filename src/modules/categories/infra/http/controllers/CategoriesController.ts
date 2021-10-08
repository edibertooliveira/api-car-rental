import { Request, Response } from 'express';
import { CreateCategoryService } from '@modules/categories/services';

import { container } from 'tsyringe';
import { StatusCodes } from 'http-status-codes';
import ImportCategoryService from '@modules/categories/services/ImportCategoryService';

export default class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const createUser = container.resolve(CreateCategoryService);
    const car = await createUser.execute({
      name,
      description,
    });
    return response.status(StatusCodes.CREATED).json(car);
  }

  public async import(request: Request, response: Response): Promise<Response> {
    const importCategories = container.resolve(ImportCategoryService);
    const filesStream = await importCategories.execute();
    return response.status(StatusCodes.OK).send(filesStream);
  }
}
