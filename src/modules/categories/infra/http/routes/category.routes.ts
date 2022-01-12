import { Router } from 'express';
import { CategoriesController } from '../controllers';

const carsRouter = Router();

const categoriesController = new CategoriesController();

carsRouter.post('/imports', categoriesController.create);

export default carsRouter;
